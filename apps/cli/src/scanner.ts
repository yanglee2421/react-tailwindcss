import net from "node:net";
import {
  catchError,
  concatMap,
  from,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  take,
  tap,
} from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { InterByteTimeoutParser, SerialPort } from "serialport";

export const scanBySerialPort = () => {
  return new Observable<string>((sub) => {
    const port = new SerialPort({
      path: "COM1",
      baudRate: 9600,
      dataBits: 8,
      stopBits: 1,
      parity: "none",
    });

    // const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));
    const parser = port.pipe(new InterByteTimeoutParser({ interval: 30 }));

    parser.on("data", (data: Buffer) => {
      sub.next(data.toString());
    });
    parser.on("error", (error) => {
      sub.error(error);
    });
    parser.on("close", () => {
      sub.complete();
    });

    return () => {
      parser.destroy();
      port.close();
    };
  });
};

export const scanAsTCPClient = () => {
  return new Observable<string>((sub) => {
    const client = net.createConnection({
      host: "192.168.2.199",
      port: 9601,
    });

    client.on("data", (data) => {
      sub.next(data.toString());
    });
    client.on("error", (error) => {
      sub.error(error);
    });
    client.on("close", () => {
      sub.complete();
    });

    return () => {
      client.destroy();
    };
  });
};

export const scanAsTCPServer = () => {
  const socket$ = new Subject<string>();
  const server$ = new Observable<net.Server>((sub) => {
    const server = net.createServer((socket) => {
      socket.on("data", (data) => {
        socket$.next(data.toString());
      });
      socket.on("error", (err) => {
        socket$.error(err);
      });
      socket.on("close", () => {
        socket$.complete();
      });
    });

    server.on("listening", () => {
      sub.next(server);
    });
    server.on("error", (error) => {
      sub.error(error);
    });
    server.on("close", () => {
      sub.complete();
    });

    server.listen(9606, "0.0.0.0", () => {
      console.log("TCP Server listening on 9606");
    });

    return () => {
      server.close();
    };
  });

  return { server$, socket$ };
};

const windowReady$ = new Subject();
const inputReady = (data: unknown) => {
  return windowReady$.pipe(
    map(() => data),
    take(1),
  );
};
export const app$ = scanBySerialPort().pipe(
  concatMap((code) => {
    const url = new URL("http://localhost:5003");

    url.searchParams.set("param", code);

    return fromFetch(url.href).pipe(
      switchMap((r) => from(r.json())),
      catchError(() => of(null)),
      switchMap((data) => inputReady(data)),
      tap((data) => {
        console.log(data);
      }),
    );
  }),
);

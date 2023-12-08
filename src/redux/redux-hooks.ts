import { UseAppDispatch, UseAppSelector } from "./redux-provider";
import { useDispatch, useSelector } from "react-redux";

export const useAppDispatch: UseAppDispatch = useDispatch;
export const useAppSelector: UseAppSelector = useSelector;

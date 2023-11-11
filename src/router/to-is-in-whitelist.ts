const whiteList = new Set<string>();
whiteList.add("login");
whiteList.add("list");
whiteList.add("forgot-passwd");
whiteList.add("register");
whiteList.add("privacy-policy");

export const toIsInWhitelist = whiteList.has.bind(whiteList);

import HTTP from "../http";
import { ILogin } from "@/interfaces/login";
import { AxiosResponse } from "axios";

export default {
  login(request: ILogin): Promise<AxiosResponse<any>> {
    return HTTP.post("/login", request);
  },
};

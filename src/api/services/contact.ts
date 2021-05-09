import HTTP from "../http";
import { IContact } from "@/interfaces/contact";
import { AxiosResponse } from "axios";

export default {
  postContactForm(data: IContact): Promise<AxiosResponse<any>> {
    return HTTP.post("/form", data);
  },
};

import { Modify } from "../Modify";
import { ILocationStopDeskDto } from "./LocationStopDeskDto";

export interface ILocationStopDeskRES
    extends Modify<ILocationStopDeskDto, { _id: string; id: string; store: string; locationId: string; createdAt: string; updatedAt: string }> {}

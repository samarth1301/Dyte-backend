import { Request, Response } from "express";
import errorHandler, {
    BadRequestError,
    NotFoundError,
  } from "../../config/utils/errorhandler";
import Slot, { SlotInput } from "../../models/Slots";
export const createSlot = async (req: Request, res: Response) => {
    try {
      const payload = req.body as SlotInput;
     console.log("This is the received payload",req.body);
     const check = await Slot.findByPk(payload.id);
     if(check){
      throw new Error("slot already exists");
     }
      const slot = await Slot.create(payload);
      return res.status(201).send(slot);
    } catch (e) {
      console.log(e);
      return errorHandler(e, req, res);
    }
  };
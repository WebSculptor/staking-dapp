"use client";

import { z } from "zod";

export const createPoolSchema = z.object({
  reward: z.string().min(1),
});

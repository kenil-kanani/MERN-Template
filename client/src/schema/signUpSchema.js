import { z } from "zod"

const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
})

export default signUpSchema
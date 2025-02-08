import bcrypt from "bcrypt";

export const hashPassword=async(password:string):Promise<string>=>{
return await bcrypt.hash(password,10)
}
export const comparepassword=async(password:string,hashpassword:string):Promise<boolean>=>{
    return await bcrypt.compare(password,hashpassword)
}
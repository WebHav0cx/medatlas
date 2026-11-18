'use client';



export const routeForRole = (role: string) => {
  if (role.startsWith("lab-"))
    return `/laboratory/${role.replace("lab-", "")}/dashboard`
  if (["doctor", "nurse", "records", "admin"].includes(role))
    return `/provider/${role}/dashboard`
  return "/patient/dashboard"
}

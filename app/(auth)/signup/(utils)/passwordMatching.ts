export default function passwordMatching(password:string,confirmPassword:string){
  let isMatching = false
  if(password === confirmPassword){
    isMatching = true
  }
  return isMatching
}
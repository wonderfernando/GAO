import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default function AvatarImageCustom() {
  return (
    <Avatar>
      <AvatarImage src="/origin/avatar-80-07.jpg" alt="Kelly King" />
      <AvatarFallback>KK</AvatarFallback>
    </Avatar>
  )
}

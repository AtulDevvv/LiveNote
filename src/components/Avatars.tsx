'use client'
import { useOthers, useSelf } from "@liveblocks/react/suspense"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
function Avatars() {
    const others=useOthers();
    const self=useSelf()

    const all=[self ,...others];

  return (
    <div className="flex gap-2 items-center">
        <p className="font-light text-sm">User currently editing this page</p>
        <div className="flex -space-x-5">
            {all.map((other,i)=>(
                <TooltipProvider key={other.id+i}>
                    <Tooltip>
                        <TooltipTrigger>
                        <Avatar className="border-2 hover:z-50">
                            <AvatarImage width={30} style={{borderRadius:"50%"}} src={other?.info.avatar}/>
                            <AvatarFallback>{other?.info.name}</AvatarFallback>

                           </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{self?.id ===other?.id?"you":other?.info.name}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                
            ))}
        </div>
    </div>
  )
}

export default Avatars
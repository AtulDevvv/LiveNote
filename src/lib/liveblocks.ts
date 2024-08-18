import {Liveblocks} from "@liveblocks/node"
 const key= process.env.NEXT_LIVEBLOCKS_SECRET_KEY;
  if (!key){
    throw new Error("LiveBlocks_private key is not set");
}
const liveblocks=new Liveblocks({
   secret:key,
});
  export default liveblocks;
import { cwd } from "process";
import mdls from "./mdls";

export default mdls;

(async () => {
  try {
    const data = await mdls("./src/index.ts", [
      "kMDItemUserTags",
      "kMDItemFSCreationDate",
    ]);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
})();

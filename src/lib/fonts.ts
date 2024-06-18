import { DM_Sans, Roboto } from "next/font/google";
const DMSans = DM_Sans({ subsets: ["latin"] });
const RobotoFont = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});
export { DMSans, RobotoFont };
import router from "core/routes";
import getUser, { showUser } from "../controller/usersController";

router.get("/users",showUser)
router.post("/users",getUser)

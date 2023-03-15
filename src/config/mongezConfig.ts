import config from "@mongez/config";
import { databaseConfiguration } from "./databaseConfiguration";
config.set({
    database : databaseConfiguration
})
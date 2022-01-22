import { Context } from "./context";
import { Environment } from "./environment";
import { TestCase } from "./test-case";
import { User } from "./user";

export class Arguments {
  public config: string = "config/config.ini"
  public url: string = "http://zarbat.ngrok.io"
  public port: string = "5004"
  public log: string = "log/zarbat.log"
  public logLevel: string = "INFO"
  public numberOfTries: string = "2"
  public test: string = "features/single/play.feature"
  constructor() {
    this.config = "config/config.ini"
    this.url = "http://zarbat.ngrok.io"
    this.port = "5004"
    this.log = "log/zarbat.log"
    this.logLevel = "INFO"
    this.numberOfTries = "2"
    this.test = "features/single/play.feature"
  }
}

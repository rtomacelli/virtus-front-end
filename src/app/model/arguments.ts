import { Context } from "./context";
import { Environment } from "./environment";
import { TestCase } from "./test-case";
import { User } from "./user";

export class Arguments {
  public config: string
  public url: string
  public port: string
  public log: string
  public logLevel: string
  public numberOfTries: string
  public test: string
  constructor() {
    this.config = "config/config.ini"
    this.url = "http://zarbat.ngrok.io"
    this.port = "5004"
    this.log = "log/zarbat.log"
    this.logLevel = "INFO"
    this.numberOfTries = "1"
    this.test = "features/single/play.feature"
  }
}

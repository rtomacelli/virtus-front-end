import { InMemoryDbService, RequestInfo, ResponseOptions, STATUS } from 'angular-in-memory-web-api';
import { ContextDataService } from './context-data.service';
import { EnvironmentDataService } from './environment-data.service';
import { FeatureDataService } from './feature-data.service';
import { NumberDataService } from './number-data.service';
import { ParameterDataService } from './parameter-data.service';
import { RunDataService } from './run-data.service';
import { ScenarioDataService } from './scenario-data.service';
import { StepDataService } from './step-data.service';
import { TestCaseDataService } from './test-case-data.service';
import { UserDataService } from './user-data.service';

const powers = [
  { id: 1, name: 'InboundXML'},
  { id: 2, name: 'REST API'},
];
const environments = [
  { id: 1, name: 'Singapore', power: '', description: '' },
  { id: 2, name: 'Indonesia', power: '', description: '' },
  { id: 3, name: 'Europe', power: '', description: '' },
  { id: 4, name: 'Canada', power: '', description: '' },
  { id: 5, name: 'US', power: '', description: '' },
];
const contexts = [
  { id: 1, name: 'ALFA', power: '', description: '' },
  { id: 2, name: 'BETA', power: '', description: '' },
  { id: 3, name: 'GAMA', power: '', description: '' },
  { id: 4, name: 'DELTA', power: '', description: '' },
  { id: 5, name: 'EPSILON', power: '', description: '' },
  { id: 6, name: 'ZETA', power: '', description: '' },
];
const features = [
  { id: 1, name: 'Conference', power: '1', description: '' },
  { id: 2, name: 'Dial', power: '1', description: '' },
  { id: 3, name: 'Gather', power: '1', description: '' },
  { id: 4, name: 'Hangup', power: '1', description: '' },
  { id: 5, name: 'Mms', power: '1', description: '' },
  { id: 6, name: 'Number', power: '1', description: '' },
  { id: 7, name: 'Pause', power: '1', description: '' },
  { id: 8, name: 'Ping', power: '1', description: '' },
  { id: 9, name: 'Play', power: '1', description: '' },
  { id: 10, name: 'PlayLastRecording', power: '1', description: '' },
  { id: 11, name: 'Record', power: '1', description: '' },
  { id: 12, name: 'Redirect', power: '1', description: '' },
  { id: 13, name: 'Reject', power: '1', description: '' },
  { id: 14, name: 'Say', power: '1', description: '' },
  { id: 15, name: 'Sip', power: '1', description: '' },
  { id: 16, name: 'Sms', power: '1', description: '' },
];
const numbers = [
  { id: 1, name: '+1 204-800-3082', power: '', description: '' },
  { id: 2, name: '+1 732-401-9498', power: '', description: '' },
  { id: 3, name: '+1 204-800-3047', power: '', description: '' },
  { id: 4, name: '+1 204-800-3029', power: '', description: '' },
  { id: 5, name: '+1 204-800-3030', power: '', description: '' },
];
const parameters = [
  { id: 1, name: 'ApiUrl', power: '', description: '' },
  { id: 2, name: 'BaseUrl', power: '', description: '' },
  { id: 3, name: 'ApiVersion', power: '', description: '' },
  { id: 4, name: 'AccountSid', power: '', description: '' },
  { id: 5, name: 'AuthToken', power: '', description: '' },
  { id: 6, name: 'From', power: '', description: '' },
  { id: 7, name: 'To', power: '', description: '' },
  { id: 8, name: 'ToSid', power: '', description: '' },
  { id: 9, name: 'ActionUrl', power: '', description: '' },
  { id: 10, name: 'StatusCallback', power: '', description: '' },
];
const runs = [
  { id: 1, name: 'Run 1 Test 1', power: '', description: '' },
  { id: 2, name: 'Run 2 Test 1', power: '', description: '' },
  { id: 3, name: 'Run 1 Test 2', power: '', description: '' },
  { id: 4, name: 'Run 2 Test 2', power: '', description: '' },
  { id: 5, name: 'Run 1 Test 3', power: '', description: '' },
  { id: 6, name: 'Run 2 Test 3', power: '', description: '' },
];
const scenarios = [
  { id: 1, name: 'Make Call', power: '', description: '' },
  { id: 2, name: 'View Call', power: '', description: '' },
  { id: 3, name: 'List Calls', power: '', description: '' },
  { id: 4, name: 'Interrupt Live Call', power: '', description: '' },
  { id: 5, name: 'Send Digits to Live Call', power: '', description: '' },
  { id: 6, name: 'Play Audio to Live Call', power: '', description: '' },
  { id: 7, name: 'Apply Voice Effect', power: '', description: '' },
  { id: 8, name: 'View Sms', power: '', description: '' },
  { id: 9, name: 'List Sms', power: '', description: '' },
  { id: 10, name: 'Send Sms', power: '', description: '' },
];
const steps = [
  { id: 1, name: 'Given my test setup runs', power: '', description: '' },
  { id: 2, name: 'Given \"NumberB\" configured to dial \"NumberC\"', power: '', description: '' },
  { id: 3, name: 'When I make a call from \"NumberA\" to \"NumberB\"', power: '', description: '' },
  { id: 4, name: 'Then \"NumberC\" should get the incoming call from \"NumberB\"', power: '', description: '' },
];
const testCases = [
  { id: 1, name: 'Test 1', power: '', description: '' },
  { id: 2, name: 'Test 2', power: '', description: '' },
  { id: 3, name: 'Test 3', power: '', description: '' },
];
const users = [
  { id: 1, name: 'Jignesh Vasoya', power: '', description: '' },
  { id: 2, name: 'Masoud Mazarei', power: '', description: '' },
  { id: 3, name: 'Kanchan Mittal', power: '', description: '' },
  { id: 4, name: 'Nithin', power: '', description: '' },
  { id: 5, name: 'Masaru Ohashi Jr', power: '', description: '' },
];
export class InMemDataService implements InMemoryDbService {
  environmentDataService: EnvironmentDataService = new EnvironmentDataService()
  contextDataService: ContextDataService = new ContextDataService()
  featureDataService: FeatureDataService = new FeatureDataService()
  numberDataService: NumberDataService = new NumberDataService()
  parameterDataService: ParameterDataService = new ParameterDataService()
  runDataService: RunDataService = new RunDataService()
  scenarioDataService: ScenarioDataService = new ScenarioDataService()
  stepDataService: StepDataService = new StepDataService()
  testCaseDataService: TestCaseDataService = new TestCaseDataService()
  userDataService: UserDataService = new UserDataService()
  createDb() {
    return { 
    'environment': environments, 
    'context': contexts, 
    'number': numbers,
    'feature': features, 
    'parameter': parameters,
    'scenario': scenarios,
    'step': steps,
    'test-case': testCases,
    'run': runs,
    'user': users,
   };
  }

  put(reqInfo: RequestInfo) {
    const collectionName = reqInfo.collectionName;
    if (collectionName === 'environment') {
      return this.environmentDataService.putEnvironment(environments, reqInfo);
    } else if (collectionName === 'context') {
      return this.contextDataService.putContext(contexts, reqInfo);
    } else if (collectionName === 'feature') {
      return this.featureDataService.putFeature(contexts, reqInfo);
    } else if (collectionName === 'number') {
      return this.numberDataService.putNumber(contexts, reqInfo);
    } else if (collectionName === 'parameter') {
      return this.parameterDataService.putParameter(contexts, reqInfo);
    } else if (collectionName === 'run') {
      return this.runDataService.putRun(contexts, reqInfo);
    } else if (collectionName === 'scenario') {
      return this.scenarioDataService.putScenario(contexts, reqInfo);
    } else if (collectionName === 'step') {
      return this.stepDataService.putStep(contexts, reqInfo);
    } else if (collectionName === 'test-case') {
      return this.testCaseDataService.putTestCase(contexts, reqInfo);
    } else if (collectionName === 'user') {
      return this.userDataService.putUser(contexts, reqInfo);
    } else {
      return this.userDataService.putUser(contexts, reqInfo);
    }    
  }

  get(reqInfo: RequestInfo) {
    const collectionName = reqInfo.collectionName;
    console.log(reqInfo)
    console.log(collectionName)
    if (collectionName === 'environment') {
      return this.environmentDataService.getEnvironments(environments, reqInfo);
    } else if (collectionName === 'context') {
      return this.contextDataService.getContexts(contexts, reqInfo);
    } else if (collectionName === 'feature') {
      return this.featureDataService.getFeatures(features, reqInfo);
    } else if (collectionName === 'number') {
      return this.numberDataService.getNumbers(numbers, reqInfo);
    } else if (collectionName === 'parameter') {
      return this.parameterDataService.getParameters(parameters, reqInfo);
    } else if (collectionName === 'run') {
      return this.runDataService.getRuns(runs, reqInfo);
    } else if (collectionName === 'scenario') {
      return this.scenarioDataService.getScenarios(scenarios, reqInfo);
    } else if (collectionName === 'step') {
      return this.stepDataService.getSteps(steps, reqInfo);
    } else if (collectionName === 'test-case') {
      return this.testCaseDataService.getTestCases(testCases, reqInfo);
    } else if (collectionName === 'user') {
      return this.userDataService.getUsers(users, reqInfo);
    } else {
      return this.userDataService.getUsers(users, reqInfo);
    }

  }

  constructor() {
  }
}


export enum ERequestTypes {
  GET = 'GET',
  POST = 'POST',
}

export interface APIResponse {
  data?: any;
  error?: string;
}

export interface IApiRequest {
  url: string;
  type: ERequestTypes;
}

export class APIUtil {

  static async makePostRequest(url: string): Promise<APIResponse> {
    return await this.startRequest(url, ERequestTypes.POST);
  }

  static async makeGetRequest(url: string): Promise<APIResponse> {
    return await this.startRequest(url, ERequestTypes.GET);
  }

  static async startRequest(
    url: string,
    type: ERequestTypes,
  ): Promise<APIResponse> {
        const config = {
            method: type,
        };

        return fetch(url, config)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return {data};
        })
        .catch(error => {
            // this is where we can call the error handler according to the error message.
            return {};
        });
    }
  }

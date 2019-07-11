# Introduction 
This sample project demonstrating usage of DigitalPersona OIDC Identity Provider for the purpose of authentication in NodeJs Express application, written in AngularJs, and for the purpose of authorization in NodeJs Express REST service. There are two connected subprojects included: <b>/your-application</b> and <b>/your-service</b>

# /your-application
Sample application that is using OpenID Connect protocol for the purpose of authenticating a user with DigitalPersona OIDC Identity Provider.   

# /your-service
Sample service consumes an Access Token issued by DigitalPersona OIDC Identity Provider and responds only if valid token has been provided. Service is using third-party libraries to parse and validate Access Token if <b>/secured</b> path has been requested.   

# Getting Started
## Prerequisites
Before running this sample, you will need to install [DigitalPersona AD server and DigitalPersona AD Web Management Components](https://a3fcb69dc7037ab91b58f8ba-qnewmedia.netdna-ssl.com/wp-content/uploads/2019/05/DigitalPersona-AD-Administrator-Guide-3.pdf),or [DigitalPersona LDS server and DigitalPersona LDS Web Management Components](https://a3fcb69dc7037ab91b58f8ba-qnewmedia.netdna-ssl.com/wp-content/uploads/2019/05/DigitalPersona-LDS-Administrator-Guide-3.pdf) on a separate machine.

## Running this example
* To run both application and service on your development machine, you first need to clone this repo by entering:
```markdown
git clone http://dp-tfs.crossmatch.net:8080/tfs/DevCollection/Dev/_git/digitalpersona-sample-js-oidc
cd digitalpersona-sample-js-oidc/
```
### 1. Setting up
* Log into server where DigitalPersona is installed
* Run Windows PowerShell(not regular command prompt) as an Administrator 
* Create temporary folder
```markdown
mkdir c:/Certificates
```
* List all certificate subjects and corresponding thumbprints
```markdown
 Get-ChildItem -Path cert:\LocalMachine\My\ -Recurse | select subject,thumbprint
```
Observe output
```markdown
Subject                                                     Thumbprint
-------                                                     ----------
CN=WIN-EREPV5I4QUB.LDSdemo.com                              EC1ED52CC059E79E7217B970A63AC6638BF60415
CN=WMSvc-WIN-EREPV5I4QUB                                    E467D0FC5F90BB58E8738B6E5330773E8DD6505D
CN=https://win-erepv5i4qub.ldsdemo.com/dpsts                E3183A8566D3E42EC995832CE0BBFFF4669F8A70
CN=DP Web Enroll                                            D44754BEADDA86D9701CD3105E0A145CD250ACFF
CN=LDSdemo-WIN-EREPV5I4QUB-CA, DC=LDSdemo, DC=com           803A65B46685B6C14B87D995BA03B73CE6913157
CN=win-erepv5i4qub.ldsdemo.com                              57D820E59731D68E9191BC5F83A0E3D58A945AE1
CN=DP Web Admin                                             378551947E87A2EF98277E99B89657A3F13ECFD5
```
* Find a certificate with a subject ending with <b>/dpsts</b> and note a thumbprint that is <b>E3183A8566D3E42EC995832CE0BBFFF4669F8A70</b> in the sample
* Export that certificate in binary encoded DER format by running a command
```markdown
Export-Certificate -Cert (Get-ChildItem -Path cert:\LocalMachine\My\<noted thumbprint>) -Type CERT -FilePath c:\Certificates\signingCertificate.cer
```
For instance,
```markdown
PS C:\Windows\system32> Export-Certificate -Cert (Get-ChildItem -Path cert:\LocalMachine\My\E3183A8566D3E42EC995832CE0BBFFF4669F8A70) -Type CERT -FilePath c:\Certificates\signingCertificate.cer
```
Observer output
```markdown
    Directory: C:\Certificates


Mode                LastWriteTime     Length Name
----                -------------     ------ ----
-a---          7/5/2019   4:53 PM        824 signingCertificate.cer
```
* Convert exported certificate into Base64 encoded format by running
```markdown
certutil -encode c:\Certificates\signingCertificate.cer c:\Certificates\signingCertificate.pem
```
Observe output
```markdown
Input Length = 824
Output Length = 1192
CertUtil: -encode command completed successfully. 
```
* Move c:\Certificates\signingCertificate.pem to your development machine into /your-service directory

### 2. Running /your-service
* Change directory to /your-service
* Install dependencies by running the following command in the project's root
```markdown
npm install
```
* Start sample application by running
```markdown
npm start
```
* Navigate browser to [http://&lt;your machine host name&gt;:3001/secured](http://<your machine host name>:3001/secured)
* Observe <b>Unauthorized</b> response, since no Access Token has not been provided

### 3. Running /your-application
* Change directory to /your-application
* Install dependencies by running the following command in the project's root
```markdown
npm install
```
* Register sample application as OIDC client with DigitalPersona Identity Provider by adding the following into <b>&lt;Clients&gt;</b> element of <b>c:\Program Files\DigitalPersona\Web Management Components\DP STS\DPPassiveSTS\web.config</b> make sure to replace <b>&lt;your machine host name&gt;</b> with the actual discoverable host name 
```xml
            <add ClientId="digitalpersona-sample-js-oidc" DisplayName="DigitalPersona Sample Js Oidc" Secret="Ks8/V0rj592QVQ5hdT+7e1NbPLa7rlloDivSAR3shFA=" Flow="Implicit">
              <RedirectUris>
                <add Uri="http://<your machine host name>:3000/callback" />
              </RedirectUris>
              <PostLogoutRedirectUris>
                <add Uri="http://<your machine host name>:3000/signout" />
              </PostLogoutRedirectUris>
            </add>
```
* Start sample application by running
```markdown
npm start
```
* Navigate browser to [http://&lt;your machine host name&gt;:3000/](http://<your machine host name>:3000/)
* Click <i>Sign in</i> button
* Upon clicking <i>Sign in</i> button, DigitalPersona identity provider appears
* Upon successful authentication with DigitalPersona identity provider, application displays user information along with the result returned from /your-service 


# Notes
* Always use https in production
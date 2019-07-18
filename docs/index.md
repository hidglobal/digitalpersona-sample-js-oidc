---
layout: default
title: Overview
nav_order: 1
---
{% include header.html %}  
<BR>  

# Introduction 1
This sample project demonstrates using the DigitalPersona OIDC Identity Provider for the purpose of authentication in a NodeJs Express application. It is written in AngularJs, and authorization is implemented through a NodeJs Express REST service.

There are two connected subprojects: <b>/your-application</b> and <b>/your-service</b>.

## /your-application
The sample application uses the OpenID Connect protocol for the purpose of authenticating a user via the DigitalPersona OIDC Identity Provider.   

## /your-service
The sample service consumes an Access Token issued by the DigitalPersona OIDC Identity Provider and responds only if a valid token has been provided. The service uses third-party libraries to parse and validate the Access Token if a <b>/secured</b> path has been requested.   

# Getting Started
## Prerequisites
Before running this sample, you will need to install [DigitalPersona AD server and DigitalPersona AD Web Management Components](https://a3fcb69dc7037ab91b58f8ba-qnewmedia.netdna-ssl.com/wp-content/uploads/2019/05/DigitalPersona-AD-Administrator-Guide-3.pdf),or the [DigitalPersona LDS server and DigitalPersona LDS Web Management Components](https://a3fcb69dc7037ab91b58f8ba-qnewmedia.netdna-ssl.com/wp-content/uploads/2019/05/DigitalPersona-LDS-Administrator-Guide-3.pdf) on a separate machine.

## Running this example
To run both the sample application and service on your development machine, you will first need to clone this repo by entering:
```markdown
git clone http://dp-tfs.crossmatch.net:8080/tfs/DevCollection/Dev/_git/digitalpersona-sample-js-oidc
cd digitalpersona-sample-js-oidc/
```
### 1. Setting up
  * Log into the server where DigitalPersona is installed.
  * Run Windows PowerShell (not the regular command prompt) as an Administrator.
  * Create a temporary folder.
```markdown
mkdir c:/Certificates
```
  * List all certificate subjects and their corresponding thumbprints.
```markdown
 Get-ChildItem -Path cert:\LocalMachine\My\ -Recurse | select subject,thumbprint
```
  * Observe the output

  <table style="width:85%;margin-left:auto;margin-right:auto;">
    <tr>
      <th style="width:60%" ALIGN="left">Subject</th>
      <th style="width:35%" ALIGN="left">Thumbprint</th>
    </tr>
    <tr>
      <td valign="top">CN=WIN-EREPV5I4QUB.LDSdemo.com </td>
      <td valign="top">EC1ED52CC059E79E7217B970A63AC6638BF60415</td>
    </tr>
    <tr>
      <td valign="top">CN=WMSvc-WIN-EREPV5I4QUB</td>
      <td valign="top">E467D0FC5F90BB58E8738B6E5330773E8DD6505D</td>
    </tr>
    <tr>
      <td valign="top">CN=https://win-erepv5i4qub.ldsdemo.com/dpsts  </td>
      <td valign="top">E3183A8566D3E42EC995832CE0BBFFF4669F8A70</td>
    </tr>
    <tr>
      <td valign="top">CN=DP Web Enroll</td>
      <td valign="top">D44754BEADDA86D9701CD3105E0A145CD250ACFF</td>
    </tr>
    <tr>
      <td valign="top">CN=LDSdemo-WIN-EREPV5I4QUB-CA, DC=LDSdemo, DC=com</td>
      <td valign="top">803A65B46685B6C14B87D995BA03B73CE6913157</td>
    </tr>
    <tr>
      <td valign="top">CN=win-erepv5i4qub.ldsdemo.com  </td>
      <td valign="top">57D820E59731D68E9191BC5F83A0E3D58A945AE1</td>
    </tr>
    <tr>
      <td valign="top">CN=DP Web Admin</td>
      <td valign="top">378551947E87A2EF98277E99B89657A3F13ECFD5</td>
    </tr>     
  </table>

  * Find a certificate with a subject ending with <b>/dpsts</b> and note a thumbprint that is <b>E3183A8566D3E42EC995832CE0BBFFF4669F8A70</b> in the sample.
  * Export that certificate in binary encoded DER format by running the command

    ```markdown
Export-Certificate -Cert (Get-ChildItem -Path cert:\LocalMachine\My\<noted thumbprint>) -Type CERT -FilePath c:\Certificates\signingCertificate.cer
```
For instance,
```markdown
PS C:\Windows\system32> Export-Certificate -Cert (Get-ChildItem -Path cert:\LocalMachine\My\E3183A8566D3E42EC995832CE0BBFFF4669F8A70) -Type CERT -FilePath c:\Certificates\signingCertificate.cer
```
Observe the output.  

    ```markdown
    Directory: C:\Certificates

    Mode                LastWriteTime       Length Name
    ----                -------------       ------ ----
    -a---               7/5/2019 4:53 PM    824 signingCertificate.cer
    ```  

  * Convert the exported certificate into Base64 encoded format by running:

    ```markdown
certutil -encode c:\Certificates\signingCertificate.cer c:\Certificates\signingCertificate.pem
```
  * Observe the output.  

    ```markdown
Input Length = 824
Output Length = 1192
CertUtil: -encode command completed successfully.
```
  * Move C:\Certificates\signingCertificate.pem to your development machine into the /your-service directory

### 2. Running /your-service
* Change the directory to /your-service.
* Install dependencies by running the following command in the project's root.  

  ```markdown
npm install
```  

* Start sample application by running  

  ```markdown
npm start
  ```
* In your web browser, open <A HREF="http://<your machine host name>:3001/secured>">http://&lt;your machine host name>:3001/secured</A>.

* Observe <b>Unauthorized</b> response, since no Access Token has been provided.

### 3. Running /your-application

* Change directory to /your-application
* Install dependencies by running the following command in the project's root  

  ```markdown
npm install
```
* Register the sample application as an OIDC client with DigitalPersona Identity Provider by adding the following into the  <b>&lt;Clients&gt;</b> element of <b>C:\Program Files\DigitalPersona\Web Management Components\DP STS\DPPassiveSTS\web.config</b>.  

  Make sure to replace <b>&lt;your machine host name&gt;</b> in the code below with the actual discoverable host name.

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
* Start the sample application by running:

  ```markdown
npm start
```

* In your web browser, open <A HREF="http://<your machine host name>:3000/>">http://&lt;your machine host name>:3000/</A>.

* Click the <i>Sign in</i> button.  
* Upon clicking the <i>Sign in</i> button, the  DigitalPersona Identity Provider displays.  
* After successful authentication through the  DigitalPersona Identity Provider, the application displays user information along with the result returned from /your-service.

# Notes
Always use https in production.

# Introduction
This sample project demonstrates using the DigitalPersona OIDC Identity Provider for the purpose of authentication in a NodeJs Express application. It is written in AngularJs, and authorization is implemented through a NodeJs Express REST service.

There are two connected subprojects: <b>/your-application</b> and <b>/your-service</b>.

## /your-application
The sample application uses the OpenID Connect protocol for the purpose of authenticating a user via the DigitalPersona OIDC Identity Provider.   

## /your-service
The sample service consumes an Access Token issued by the DigitalPersona OIDC Identity Provider and responds only if a valid token has been provided. The service uses third-party libraries to parse and validate the Access Token if a <b>/secured</b> path has been requested.   

# Getting Started
## Prerequisites
Before running this sample, you will need to
* Install Git
* Install latest NodeJS server
* [Signup](https://www.crossmatch.com/digitalpersona-composite-authentication-free-trial/) for trial version of [DigitalPersona AD server and DigitalPersona AD Web Management Components](https://a3fcb69dc7037ab91b58f8ba-qnewmedia.netdna-ssl.com/wp-content/uploads/2019/05/DigitalPersona-AD-Administrator-Guide-3.pdf),or the [DigitalPersona LDS server and DigitalPersona LDS Web Management Components](https://a3fcb69dc7037ab91b58f8ba-qnewmedia.netdna-ssl.com/wp-content/uploads/2019/05/DigitalPersona-LDS-Administrator-Guide-3.pdf)
* Install DigitalPersona them on a separate server.

## Running this example
* To run both the sample application and service on your development machine, you will first need to clone this repo by entering:
```markdown
git clone https://github.com/hidglobal/digitalpersona-sample-js-oidc.git
cd digitalpersona-sample-js-oidc/
```
### 1. Setting up
  * Open the [https://&lt;DigitalPersonaHostName&gt;/dppassivests/wsfed/metadata](https://&lt;DigitalPersonaHostName&gt;/dppassivests/wsfed/metadata) in Web browser. The response will look like

```xml
<EntityDescriptor xmlns="urn:oasis:names:tc:SAML:2.0:metadata" ID="_32ce6961-33d6-4345-bbe3-9c71880494d6" entityID="https://win-je24ttb0q9g.virgo.com/dpsts">
    <Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
        <SignedInfo>
            <CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
            <SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/>
            <Reference URI="#_32ce6961-33d6-4345-bbe3-9c71880494d6">
                <Transforms>
                    <Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
                    <Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
                </Transforms>
                <DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
                <DigestValue>Y0EVRJ/oI7PadT7aV3uPTlDNm0Ii65248ltCDuGj8GU=</DigestValue>
            </Reference>
        </SignedInfo>
        <SignatureValue>
            brQuNkzJ/MVKn/vu8cwgu4xpPJkb2nTtHDZJCHJSDjPMdDQuHu5GyIXMso1khst2s2uyonQ4XTK4ETww/tBmY21QBMpd5a9clzsLcPjezAzh76A6mWbjg6QzVOrKgRuQVscB1sDvoc+pOCicpCPczaVUQjdPY4XG/K4G87V//HDVkds/ahR/UoQ47zD+iRtKbT0NboCjcPgQbBzeuC/4gaxAg/bIrSyRl5HYAnFkjQbAS3DHqcNe6VNBQQcgYCfcHt8zM3YCJ/s1N7wpzcBA+W9MnZpIm4kAUgQ5EFJ5pkH1cYW2mzLm4ewIoQnASHHeYG+OfrfQZg7xMfvESebvFA==
        </SignatureValue>
        <KeyInfo>
            <X509Data>
                <X509Certificate>
                    MIIDNDCCAhygAwIBAgIQOfiz4aeylZpA51F4ujT/xjANBgkqhkiG9w0BAQsFADAyMTAwLgYDVQQDDCdodHRwczovL3dpbi1qZTI0dHRiMHE5Zy52aXJnby5jb20vZHBzdHMwHhcNMTgwNDIzMTE1OTE4WhcNMjEwNDIzMTE1OTE4WjAyMTAwLgYDVQQDDCdodHRwczovL3dpbi1qZTI0dHRiMHE5Zy52aXJnby5jb20vZHBzdHMwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDG6VksGwzvpF94yg425NcVkcXPcK1ss1gSNfcH4TDhHSTCeI4n3r0sBl+L5SCoFQu6BQYpg73U9MUDvDWM1b7vo9Ou4Ic5Q7JCflXEjKPRE5x3KkWX0e/5jG9doujF6Amf6PDJxykDA1ZQejXaqqnwsY4XjF5QkuaelzTkKXEBL3zrvJ6sVjSby49ALRf1uyHmrzX0ucMkO/d6/2+5kGltKKPKhIoGQ/ZWxm+/ujfjHOAn0O3ZbA/BUXZ9u4/KNrDRcEX4MopzI2P6ofgNBUo0dslN2nEys5Qt1iC92AWIt27Jf7UkuEnMiDaT56vaGm3KdnlWuJ/UJJECCX1039orAgMBAAGjRjBEMBMGA1UdJQQMMAoGCCsGAQUFBwMBMB0GA1UdDgQWBBSUfq3GfNRdFWFxpap1zR/YTAi04zAOBgNVHQ8BAf8EBAMCBSAwDQYJKoZIhvcNAQELBQADggEBAGJXFq091wYij3L4Mh0oGssDC/Z+J5NfrqRErImTCrrCkGXxh4500tvrIGOi0usm9Y3X+bldqmVxFgGPO1PwwAHO7zzB/YasQe7QN19Oe2VvR0lBvkaNEQor+u2k7dDJrpDW0vJ+YWDSFtpyHjGrtLQygGuDOo5UCzCSObVDDbfjNO/c7QtuCvZkzn11jhxIqjJHk3f5u40znPC33bmldbeVcpCaDgP7oZab81hg6WpmqZEJqF8mKr4vtBIxZsxaCHP95sKKMLX4shETiM7REsldkpqjawIJ7KRdqChUcFYz4ILV4BlRnUWWAWQv17uJHQV02Uozq2lhi3LVNNaELHQ=
                </X509Certificate>
            </X509Data>
        </KeyInfo>
    </Signature>
    <!-- More settings here-->
</EntityDescriptor>
```  

  * Locate first occurrence of <b>&lt;X509Certificate&gt;</b> tag and copy the content into clipboard. For the sample response above, you would need to select and copy <b>MIIDNDCCAhygAwIBAgIQOfiz4aeylZpA51F4ujT/xjANBgkqhkiG9w0BAQsFADAyMTAwLgYDVQQDDCdodHRwczovL3dpbi1qZTI0dHRiMHE5Zy52aXJnby5jb20vZHBzdHMwHhcNMTgwNDIzMTE1OTE4WhcNMjEwNDIzMTE1OTE4WjAyMTAwLgYDVQQDDCdodHRwczovL3dpbi1qZTI0dHRiMHE5Zy52aXJnby5jb20vZHBzdHMwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDG6VksGwzvpF94yg425NcVkcXPcK1ss1gSNfcH4TDhHSTCeI4n3r0sBl+L5SCoFQu6BQYpg73U9MUDvDWM1b7vo9Ou4Ic5Q7JCflXEjKPRE5x3KkWX0e/5jG9doujF6Amf6PDJxykDA1ZQejXaqqnwsY4XjF5QkuaelzTkKXEBL3zrvJ6sVjSby49ALRf1uyHmrzX0ucMkO/d6/2+5kGltKKPKhIoGQ/ZWxm+/ujfjHOAn0O3ZbA/BUXZ9u4/KNrDRcEX4MopzI2P6ofgNBUo0dslN2nEys5Qt1iC92AWIt27Jf7UkuEnMiDaT56vaGm3KdnlWuJ/UJJECCX1039orAgMBAAGjRjBEMBMGA1UdJQQMMAoGCCsGAQUFBwMBMB0GA1UdDgQWBBSUfq3GfNRdFWFxpap1zR/YTAi04zAOBgNVHQ8BAf8EBAMCBSAwDQYJKoZIhvcNAQELBQADggEBAGJXFq091wYij3L4Mh0oGssDC/Z+J5NfrqRErImTCrrCkGXxh4500tvrIGOi0usm9Y3X+bldqmVxFgGPO1PwwAHO7zzB/YasQe7QN19Oe2VvR0lBvkaNEQor+u2k7dDJrpDW0vJ+YWDSFtpyHjGrtLQygGuDOo5UCzCSObVDDbfjNO/c7QtuCvZkzn11jhxIqjJHk3f5u40znPC33bmldbeVcpCaDgP7oZab81hg6WpmqZEJqF8mKr4vtBIxZsxaCHP95sKKMLX4shETiM7REsldkpqjawIJ7KRdqChUcFYz4ILV4BlRnUWWAWQv17uJHQV02Uozq2lhi3LVNNaELHQ=</b>
  * Open digitalpersona-sample-js-oidc\your-service\signingCertificate.pem file in the text editor. It will look like
```text
-----BEGIN CERTIFICATE-----
-----END CERTIFICATE-----
```
  * Insert empty line in between <b>-----BEGIN CERTIFICATE-----</b> and <b>-----END CERTIFICATE-----</b>, then paste clipboard contents there, so it will look like
```text
-----BEGIN CERTIFICATE-----
MIIDNDCCAhygAwIBAgIQOfiz4aeylZpA51F4ujT/xjANBgkqhkiG9w0BAQsFADAyMTAwLgYDVQQDDCdodHRwczovL3dpbi1qZTI0dHRiMHE5Zy52aXJnby5jb20vZHBzdHMwHhcNMTgwNDIzMTE1OTE4WhcNMjEwNDIzMTE1OTE4WjAyMTAwLgYDVQQDDCdodHRwczovL3dpbi1qZTI0dHRiMHE5Zy52aXJnby5jb20vZHBzdHMwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDG6VksGwzvpF94yg425NcVkcXPcK1ss1gSNfcH4TDhHSTCeI4n3r0sBl+L5SCoFQu6BQYpg73U9MUDvDWM1b7vo9Ou4Ic5Q7JCflXEjKPRE5x3KkWX0e/5jG9doujF6Amf6PDJxykDA1ZQejXaqqnwsY4XjF5QkuaelzTkKXEBL3zrvJ6sVjSby49ALRf1uyHmrzX0ucMkO/d6/2+5kGltKKPKhIoGQ/ZWxm+/ujfjHOAn0O3ZbA/BUXZ9u4/KNrDRcEX4MopzI2P6ofgNBUo0dslN2nEys5Qt1iC92AWIt27Jf7UkuEnMiDaT56vaGm3KdnlWuJ/UJJECCX1039orAgMBAAGjRjBEMBMGA1UdJQQMMAoGCCsGAQUFBwMBMB0GA1UdDgQWBBSUfq3GfNRdFWFxpap1zR/YTAi04zAOBgNVHQ8BAf8EBAMCBSAwDQYJKoZIhvcNAQELBQADggEBAGJXFq091wYij3L4Mh0oGssDC/Z+J5NfrqRErImTCrrCkGXxh4500tvrIGOi0usm9Y3X+bldqmVxFgGPO1PwwAHO7zzB/YasQe7QN19Oe2VvR0lBvkaNEQor+u2k7dDJrpDW0vJ+YWDSFtpyHjGrtLQygGuDOo5UCzCSObVDDbfjNO/c7QtuCvZkzn11jhxIqjJHk3f5u40znPC33bmldbeVcpCaDgP7oZab81hg6WpmqZEJqF8mKr4vtBIxZsxaCHP95sKKMLX4shETiM7REsldkpqjawIJ7KRdqChUcFYz4ILV4BlRnUWWAWQv17uJHQV02Uozq2lhi3LVNNaELHQ=
-----END CERTIFICATE-----
```
  * Save digitalpersona-sample-js-oidc\your-service\signingCertificate.pem file

### 2. Running /your-service
* Open command line prompt as an Administrator.
* Change the directory to /your-service.
* Open package.json in text editor and locate <b>your-service</b> section

```json
  "your-service": {
    "authenticationOptions": {
      "audience": "https://<DigitalPersonaSTSHostName>/dpsts/resources",
      "issuer": "https://<DigitalPersonaSTSHostName>/dpsts",
      "clockTolerance": 10
    }
  }
```

* Replace <b>&lt;DigitalPersonaHostName&gt;</b> with the actual host name for the server running DigitalPersona. The result would like like, assuming that win-je24ttb0q9g.virgo.com is the actual host name

```json
  "your-service": {
    "authenticationOptions": {
      "audience": "https://win-je24ttb0q9g.virgo.com/dpsts/resources",
      "issuer": "https://win-je24ttb0q9g.virgo.com/dpsts",
      "clockTolerance": 10
    }
  }
```

* Install dependencies by running the following command inside /your-service directory.

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
* Open command line prompt as an Administrator.
* Change directory to /your-application
* Install dependencies by running the following command in the project's root  

```markdown
npm install
```

* Open public/app/app.controller.js in text editor and locate the following line of a code

```javascript
    var digitalPersonaHostName = '<DigitalPersonaSTSHostName>';
```

* Replace <b>&lt;DigitalPersonaHostName&gt;</b> with the actual host name for the server running DigitalPersona. The result would like like, assuming that win-je24ttb0q9g.virgo.com is the actual host name

```javascript
    var digitalPersonaHostName = 'win-je24ttb0q9g.virgo.com';
```

* Register the sample application as an OIDC client with DigitalPersona Identity Provider by adding the following into the  <b>&lt;Clients&gt;</b> element of <b>C:\Program Files\DigitalPersona\Web Management Components\DP STS\DPPassiveSTS\web.config</b>.  

  Make sure to replace <b>&lt;your machine host name&gt;</b> in the code below with the actual discoverable host name.

```xml
    <add ClientId="digitalpersona-sample-js-oidc" DisplayName="DigitalPersona Sample Js Oidc" Secret="Ks8/V0rj592QVQ5hdT+7e1NbPLa7rlloDivSAR3shFA=" Flow="Implicit">
        <RedirectUris>
            <add Uri="http://<SampleAppMachineName>:3000/callback" />
        </RedirectUris>
        <PostLogoutRedirectUris>
            <add Uri="http://<SampleAppMachineName>:3000/signout" />
        </PostLogoutRedirectUris>
    </add>
```

* Start the sample application by running:

```markdown
npm start
```

* In your web browser, open <A HREF="http://<your machine host name>:3000/>">http://&lt;your machine host name>:3000/</A>.

* Click the <i>Sign in</i> button.  
* Upon clicking the <i>Sign in</i> button, you will be redirected to the DigitalPersona Identity Provider.  
* After successful authentication with the DigitalPersona Identity Provider, the sample application displays user information along with the result returned from /your-service.

# Notes
Always use https in production.

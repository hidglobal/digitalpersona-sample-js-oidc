#Introduction 
This is a sample project demonstrating a usage of digitalPersona Identity Provider in node express application. Sample application is using OpenID Connect protocol for the purpose of authenticating a user with digitalPersona identity provider   

#Getting Started
##Running this example
* Install [DigitalPersona AD server and DigitalPersona AD Web Management Components](https://a3fcb69dc7037ab91b58f8ba-qnewmedia.netdna-ssl.com/wp-content/uploads/2019/05/DigitalPersona-AD-Administrator-Guide-3.pdf),or [DigitalPersona LDS server and DigitalPersona LDS Web Management Components](https://a3fcb69dc7037ab91b58f8ba-qnewmedia.netdna-ssl.com/wp-content/uploads/2019/05/DigitalPersona-LDS-Administrator-Guide-3.pdf).
* To run this application, you first need to clone this repo by entering:
```markdown
git clone http://dp-tfs.crossmatch.net:8080/tfs/DevCollection/Dev/_git/digitalpersona-sample-js-oidc
cd digitalpersona-sample-js-oidc/
```
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

#Notes
* Always use https in production
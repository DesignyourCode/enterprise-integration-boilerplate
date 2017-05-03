# Enterprise Integration Boilerplate

A simple gulp boilerplate for helping developers integrate their code with Enterprise Marketing Automation Software, like Adobe Experience Manager, Eloqua or Marketo.

**View boilerplate index:** https://designyourcode.github.io/enterprise-integration-boilerplate/dist/

**View boilerplate readme:** https://designyourcode.github.io/enterprise-integration-boilerplate/



## Conditions

It is important to know that this boilerplate may not meet all of your requirements. This boilerplate aims to bring standards to your project and simplifying some of the deployment process that I came up against on projects I have worked on.



## Set up

 1. Clone this repo
 2. Ensure git is relinked to your repo
 3. Run `npm install` in the root of the project
 4. Edit the gulp file to handle re-linking of assets throughout the HTML.

 > **Notes:** Comments can be found throughout the project, you may want to remove these.



## Code

It is important to set the standards you will use on your project from the start. Often when building sites to sit within a clients system such as; Eloqua, Marketo or Adobe Experience Manager (AEM), they will have already defined some of the standards you should use.

#### HTML

When adding your HTML to this boilerplate, it is working considering what impact that HTML might have to elements within the clients existing page. For example the footer or header.

**TIPS:**

1. You should make sure that your elements clear correctly. Reducing the risk that elements elsewhere on the page will float up and intrude on your code.
2. Ensure that any ID's and/or classes you use don't already exist in the template you'll be adding your code to. Try to make them more unqiue if possible, for example `.en-in—element-name`. In this case, this stands for `enterprise-integration—`.

#### CSS

This boilerplate supports SASS, and uses gulp to compile this down. I have also include some 'quick start' SASS, which aims to take a OOCSS approach. For more information on this approach, have a read [here](http://designyourcode.io/how-i-do-css).

> **Tip:** OOCSS will allow your client to make simple changes to the page without have to touch the SASS and recompile. Increasing flexibility, and reducing the need for back and forth changes.

As mentioned earlier, using more unique classes allows you to reduce any risk of your styles interfering with your clients. For example:

```scss
$grey: #666666;

.en-in--paragraph {
  color: $grey;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 20px;
}
```

This can then be added to any `<p class="en-in--paragraph">` with no risk of it affecting the clients <p> tag's. 

**_So what happens when I want a different paragraph colour?_**

Simple, this is where the OOCSS methodology comes in. All you need to do is create a new class, following the same format and apply that as well. This would look something like this:

```scss
$grey: #666666;
$red: #ff0000; 

.en-in--paragraph {
  color: $grey;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 20px;
  
  &.en-in--text-red {
    color: $red;
  }
}
```

```html
<p class="en-in--paragraph en-in--text-red">Red text</p>
```



**_How do I make my SCSS easy to manage with these long class names?_**

This is a good question. You don't really want to write out `.en-in—` every thime. It is not a good use of time. To help with that, I have added some snippets to the SCSS files that are in this boilerplate.

1. The first is the global ID. This wraps everything in your SCSS, so that your styles really are unique to your project. You can view this [here](https://raw.githubusercontent.com/DesignyourCode/enterprise-integration-boilerplate/master/src/styles/app.scss), the idea is that you set your global ID in the `_settings.scss` file, then when the SCSS is compiled, the ID will be prefixed to everything.

   ```scss
   $globalId: '#project-id';

   #{$globalId} { 
     .en-in--paragraph { ... }
   }
   ```

   Your final CSS would like this:

   ```css
   #project-id .en-in--paragraph { ... }
   ```

2. The next part of your CSS workflow, is to reduce the number of times you have to prefix your class names with `.en-in—` or whatever you have chosen to use. This is done by setting this as a global variable in `_settings.scss` as well, and then letting SCSS interpolation take care of the rest, which means your SCSS would look something like this:

   ```scss
   $prefix: '.en-in-';

   #{$prefix}-paragraph { ... }
   ```

   Outputting to:

   ```css
   .en-in--paragraph { ... }
   ```

   > **Note:** Remember that you can't just use `$prefix-paragraph` . You **must** interpolate is so that the actual variable text is used.

3. The last thing relating to SCSS, is thinking about how you structure your class names when developing. By thinking about it upfront, you can definitely save yourself some lines of code.
   Above, we talk about OOCSS method, and have this code currently:

   ```scss
   $grey: #666666;
   $red: #ff0000;

   .en-in--paragraph {
     color: $grey;
     font-size: 16px;
     font-family: Arial, Helvetica, sans-serif;
     line-height: 20px;
     
     &.en-in--text-red {
       color: $red;
     }
   }
   ```

   If you tweak this and include the interpolation code from step 2, you can have something like this:

   ```scss
   $grey: #666666;
   $red: #ff0000;

   #{$prefix}-paragraph {
     color: $grey;
     font-size: 16px;
     font-family: Arial, Helvetica, sans-serif;
     line-height: 20px;
     
     &-text {
       &-red {
         color: $red;
       }
       &-green {
         color: $green;
       }
       &-underline {
         text-decoration: underline;
       }
     }
   }
   ```

   Now you have only used the interpolated variable once, but have mutiple classes that you can use with it. You can see below what the HTML will look like now:

   ```html
   <!-- Normal paragraph -->
   <p class="en-in--paragraph">Normal paragraph</p>

   <!-- Red text -->
   <p class="en-in--paragraph-text-red">Red text</p>

   <!-- Underlined text -->
   <p class="en-in--paragraph-text-underline">Underlined text</p>

   <!-- Green and underlined text -->
   <p class="en-in--paragraph-text-green en-in--paragraph-text-underline">Underline text</p>
   ```

   As you can see, the class names are slightly longer, but they clearer explain what they are doing. This will make it easy for other developers to understand what is going on, and will also make it easier for your client if they decide that want to make simple changes.

#### JavaScript

In this boilerplate, I have only set up a basic gulp script for compiling simple Javascript. You will need to include your own libraries etc and handle those yourself. The script compilation should work work AngularJS also, but you will need to **test** thoroughly.

> **Note:** You client likely already has jQuery or similar JavaScript libraries installed in their site, however they may not be running a version you need. In the `app.js` file I have put in some starter code for setting jQuery to 'no conflict' mode. This should help reduce risks when importing your code, into their system.
>
> **Ensure you test both locally, in a development environment, and in the clients system to ensure there are no conflicts**

There is little else to say on JavaScript. This really comes down to what you want to achieve and is very unique to each project.



## Workflow

This boilerplate functions using gulp. The main features include:

1. Local static service using browser sync (to help with device testing)
2. Compilation and minfication of SCSS and JavaScript
3. Compilation of local version of HTML into a version which will work on a dev site and a production ready output that can be copied directly into Eloqua, Marketo or Adobe Experience Manager.
4. Separate output of CSS file and Javascript file incase you want to upload these instead of using the injected inline version.
5. Support for relative vs absolute URLs for assets. **This is likely unqiue to each project, but should help get you started.**

For more details on what is happening within the gulp, I have added more details comments to the [gulpfile](https://raw.githubusercontent.com/DesignyourCode/enterprise-integration-boilerplate/master/gulpfile.js) itself.



## To Do's

1. Improve gulp script so that you don't have to wait as long or save twice.


## Licence

This project is under the MIT license. See the [complete license](LICENSE):

    LICENSE

## Contributing

Feel free to fork this project and submit pull requests and your contributions will be considered.
It is recommended you get in touch or raise an issue first to discussion your request.

## Reporting an issue or a feature request
Issues and feature requests are tracked in the [Github issue tracker](https://github.com/DesignyourCode/enterprise-integration-boilerplate/issues).

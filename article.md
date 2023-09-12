# Advanced multistyle components with Tailwind & TypeScript

## Intro

As you might - or might not, know by now, I'm pretty keen on Tailwind CSS. It's allowed me to quickly develop awesome UIs with ease and its ecosystem is extensive, consisting of plugins, ready-made UI libraries and great documentation. But what if you want work on a project that defined its own design system? Would Tailwind still be a valid option? This tutorial explores design systems and how to implement an advanced multistyle component using Tailwind CSS.

## Design systems & Tailwind's utility classes

Design systems, by definition, are not just simple styleguides. They include technical specifications and guidelines, principles, documentation, processes and much more. It covers tangible products such as templates, layouts, interactions, UI components, colours, typo- and iconography and illustrations. Design systems tend to cover a products entire ecosystem and aren't necessary limited to a single outlet of a product, such as a website or mobile application.

Tailwind CSS is basically a utility-first API for your design system. It provides an extensive amount of classes that help developers work within the constraints of elaborate design systems. Utilities cover things such as paddings and margins, colours, typography, pseudo-classes & -elements, and more.

So, let's learn how to create a generic and reusable multistyle component using Tailwind CSS and TypeScript.

## Setting up our environment

This part of the tutorial assumes a few things:

- You are familiar with Tailwind CSS.
- You are familiar with React. This tutorial focusses on a fairly simple component without any state management involved, though the general idea of this tutorial can be used in more advanced components.
- You are familiar with TypeScript. We'll be using some custom types, built-in utility types and generic types. This tutorial will in no way be a deep-dive and all concepts will be explained, but some basic knowledge is useful.

We'll be using [Vite](https://vitejs.dev/) in this tutorial as our build tool. Vite leverages native ES modules and hot module replacement (HMR), allowing for an amazingly fast feedback loop during development. Contrary to tools like webpack, Vite doesn't necessary slow down the larger your application grows. However, given the scope of this tutorial, we do not really have to worry about performance optimisation that much. We can easily scaffold a Vite (with React and TypeScript) project by running `npm create vite@latest tailwind-multistyle-components -- --template react-ts` in your preferred Terminal. Depending on your version of npm, you might need to omit the first pair of `--`. This script will create a new Vite project folder in our current directory. Now, to get started, all we have to do is `cd tailwind-multistyle-components` and install our packages using `npm install`. Afterwards, run `npm run dev` to get your localhost up and running. If you followed along, you'll end up with code looking like [this](https://github.com/LuukRos/tailwind-multistyle-components/commit/fc9091c68cd7ed802cd1ba4df2694d99fe12e669).

At this point, we've got a solid base for building a React application with TypeScript. We'll have to do some additional setup in order to get started with Tailwind CSS.
First, install the dependencies needed for Tailwind by running `npm install --save-dev tailwindcss postcss autoprefixer`.
Next, run `npx tailwindcss init -p --ts` to scaffold Tailwind CSS into your project. This will create several files in your project, such as `tailwind.config.ts` and `postcss.config.js` configuration files.
After that, we'll want to update our `tailwind.config.ts` file so that it can handle our JSX (or rather TSX) files for us:

```ts
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
} satisfies Config;
```

We're almost there! Or actually.. We're almost ready to actually get started. We now have to alter our project's `index.css` file to be able to pick up Tailwind's utilities. We do this by replacing the file's contents by

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Now come two last optional steps. You don't have to follow along, but it gives you a cheeky little glimps into the awesome ecosystem that has developed around Tailwind.

First, let's install Prettier and a neat little plugin into our codebase by running `npm install --save-dev prettier prettier-plugin-tailwindcss`. [Prettier](https://prettier.io/) is an opinionated code formatter that makes sure all our code looks neatly organised. The Tailwind CSS [plugin](https://tailwindcss.com/docs/editor-setup#automatic-class-sorting-with-prettier) for Prettier is an official plugin by the creators of Tailwind and automatically sorts classes based on their recommended class order. This allows you to get familiar with preferred positions of utility classes and makes it easier for you to find classes to adjust on the long term. It might seem overwhelming now, but stick to it and you'll be the Usain Bolt of writing Tailwind in no-time.

Second, make sure you install the [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extension if you are using VS Code as your preferred IDE. It'll take your experience developing using Tailwind to the next level by providing you with featurs such as autocompletion, syntax highlighting and linting. We'll take this extension to the next level by altering the default settings ever so slightly. Open up your `settings.json` file and chuck this code snippet in there. I'm going to ask you to trust me on this one, as I'll elaborate on this once we actually need to.

```json
"tailwindCSS.classAttributes": [
  "class",
  "className",
  "ngClass",
  ".*Classes.*"
],
```

Once again, if you followed along and set up everything nicely, your code should look like [this](https://github.com/LuukRos/tailwind-multistyle-components/commit/fe70444e4d633cff2971007cbb74f59734cb7601).

## Creating a Button component

Alright. Now for the fun part. Let's start out with creating a simple `Button` component in React. Create a `components` folder in your project's `src` directory and add a `button.tsx` file in there. Depending on how you would like to proceed after this tutorial, you can also opt to create a nested folder inside your `components` folder called `button`. This could be useful for when you'd like to group your tests or Storybook stories together with your component.

```tsx
export const Button = ({ ...restProps }: React.ComponentProps<"button">) => {
  return <button {...restProps} />;
};
```

We start of with a very basic `Button` component. This button does not necessarily accept any specific props yet, though we do spread `restProps` as one of our function's parameters. We then define the type for these `restProps` using a type native to React: `ComponentProps`. This type accepts one type argument (or generic, if you will) which represents, after quite some drilling down into React's type declaration files, keys of the `IntrinsicElements` interface. These keys essentially represent all different elements that can be present in the DOM. We pass `button` as the type argument, so that we can access all 'regular' [button attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes) when using the component. We are now able to use our new component inside our project's `App.tsx` file by simply including `<Button>Click me!</Button>`. Double check if you can use a button's attributes by tapping `ctrl + space` in your IDE - it should give you a list of all possible options!

Our button doesn't look particularly good now, does it? Let's spice it up with some Tailwind utility classes to make it more appealing and accessible, by providing some `focus-visible` styles. You can opt to add some classes yourself to suit your taste in design, or follow along with my classes. Either way, here are the classes that I added to a new `className` attribute I added to out `Button` component file.

```tsx
<button
  className="bg-sky-500 px-4 py-3 text-base font-semibold text-white hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 active:translate-y-px disabled:bg-gray-300 disabled:text-gray-400 disabled:hover:cursor-not-allowed"
  {...restProps}
/>
```

If you did decide to follow along with the _entire_ setup of our working environment you'll notice some cool things! Hovering over the classes tell you exactly what CSS properties they apply; classes get sorted automatically and you see a neat little colour preview when looking at colour utils.

Notice how we did not add the `className` to our `<Button>` component in `App.tsx`? While this is still a valid thing to do, it would kind of beat the purpose of creating actual reusable components: we want to define the base for _every_ button in our application and not rewrite the same list of styles multiple times.

But what if we want different buttons for different scenarios? What about different colours, shapes, sizes? Well, my dear reader, that is where the essence of this tutorial will come in!

We can define the different 'flavours' of our `Button` component using React props. Let's define a custom TypeScript `type` that'll define the shape of our component's properties. You can go all out with properties if you would like, but I'll focus on four main variants for now:

- tone (the 'message' a button conveys, translates to the colour of a button)
- impact (the 'weight' or 'importance' of a button)
- shape
- size

```tsx
type ButtonProps = {
  tone?: "default" | "danger" | "warning" | "success";
  impact?: "bold" | "light" | "bordered";
  shape?: "rounded" | "pill" | "square";
  size?: "sm" | "md" | "lg";
};
```

All different properties are marked as optional using the `?` directly after its name, meaning none of them are mandatory when using `<Button>` components throughout your project. Counterpoint to this: since all properties are marked as optional, it is a good practice to supply default values for these properties in our `Button` component. You can achieve this by destructuring the properties in the component directly, while simultaneously assigning a default value. Your `Button` component should then end up looking something like this:

```tsx
export const Button = ({
  tone = "default",
  impact = "bold",
  shape = "rounded",
  size = "md",
  ...restProps
}: ButtonProps & React.ComponentProps<"button">) => {
  return (
    <button
      className="bg-sky-500 px-4 py-3 text-base font-semibold text-white hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 active:translate-y-px disabled:bg-gray-300 disabled:text-gray-400 disabled:hover:cursor-not-allowed"
      {...restProps}
    />
  );
};
```

Your IDE will start yelling at you now. Why? Because we haven't actually implemented `tone`, `impact` or the other properties!

So, to reiterate: we have a `<Button>` component that defines some base styles and accepts four properties. Our props are various unions of different 'flavours' for our button, and will allow us to implement various types of buttons:

- `<Button>Click me!</Button>` will just show a button with all default property values
- `<Button impact="light">` will, eventually, show a different `impact` variant of button
- `<Button impact="bordered" tone="warning" shape="pill" size="lg">` will, eventually, show a button with variants for all passed in properties

## Implementing different button variants

### Our first variant

Implementing the different variants for our `Button` component may seem like a daunting task at first, but once you have one single variant 'flavour' up and running, the rest _should_ be a piece of cake.

Let's start by focussing on the `size` property of our button. We can have a look at the base classes we defined earlier to determine what classes we could use or alter to make our button appear in different sizes.

I'll give you a second to figure those classes out.

Think you've got it?

If you guessed `px-4`, `py-3` and `text-base` as classes that impact the size of a button, you are correct! But then another question arises: how do we subtract these classes into their own scope, which would allow us to cherry pick and combine classes associated to the component's different props?

We can create a lookup object containing all `size` variants of `ButtonProps` as keys, paired with different Tailwind classes as its values.

```tsx
const sizeClasses: Record<ButtonProps["size"], string> = {
  sm: "p-2 text-sm", // slightly smaller padding and text classes
  md: "px-4 py-3 text-base", // these are the classes from our original base styles
  lg: "px-8 py-4 text-lg", // slightly larger padding and text classes
};
```

Unfortunately, your IDE will yell at you yet again. Why? The Button's `size` property is optional, meaning a possible value is `undefined`, which we can not use to index our `Record`. We can easily fix this by leveraging the built-in `NonNullable` type of [TypeScript](https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullabletype). This will construct a new type by exclusing `null` and `undefined` from the passed in type. Our IDE should now be happy and we can carry on with actually implementing these classes.

### Merging classes

If you've ever worked with constructing classes based on conditions, you might be familiar with packages such as [clsx](https://www.npmjs.com/package/clsx) or [classnames](https://www.npmjs.com/package/classnames). Both of these packages are very popular and, as a nice bonus, relatively small. Let's install clsx by running `npm install --save clsx` in our Terminal, import `clsx`, and then merge our base and size classes to be used in the component. The Button component file should look something like this:

```tsx
import clsx from 'clsx';

...

<button
  className={clsx(
    "bg-sky-500 px-4 py-3 text-base font-semibold text-white hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 active:translate-y-px disabled:bg-gray-300 disabled:text-gray-400 disabled:hover:cursor-not-allowed",
    sizeClasses[size],
  )}
  {...restProps}
/>
```

You may notice something. We've left the original padding and text classes in the base class list, but also appended the classes as set by `size`. This results in an issue, because we'll now end up with clashing classes in our components class list. Why is this an issue? While the result of our component might look okay right now, the component becomes more unpredictable due to the way CSS and the cascade works.

I could write a whole article about this very issue, but instead I would like to point you to an [amazing video](https://www.youtube.com/watch?v=tfgLd5ZSNPc) in which Simon Vrachliotis (an absolute legend on educating Tailwind) explains this and how to resolve this. The solution? Another neat package called [tailwind-merge](https://www.npmjs.com/package/tailwind-merge). I'm not going to force you to watch the entire video and figure out why tailwind-merge is better than something like clsx for our use case. I'll just tell you. tailwind-merge, as its names ever so clearly implies, merges lists of Tailwind classes _without style conflicts_. It'll predictably merge classes in which conflicting classes passed last always win. Any losing classes will be removed from the class list and not be rendered in the DOM.

Let's give tailwind-merge a try. First, start by cleaning up a little bit - remove clsx by running `npm uninstall clsx` and then install tailwind-merge by running `npm install --save tailwind-merge`. Replace our `clsx` import statement by `import { twMerge } from 'tailwind-merge` and replace the `clsx()` method in our `<button>` element with `twMerge`. Easy peasy, lemon squeezy! Save your changes and check your browser. What happened? tailwind-merge has cleaned up the padding and text classes as defined in our base class list and appended the size classes in the correct way! This may at this point feel a bit underwhelming at first, but just wait. You'll see that, the more button variants we implement, the more useful this functionality will become. If you've been following along, your code should like something like [this](https://github.com/LuukRos/tailwind-multistyle-components/commit/5776f9c54b7eca053bafc014f814f966d5943cc0) at this point.

### Implementing other variants

Let's shift gears for a bit since this part of the tutorial is a bit repetitive. I'll prep some more cool variant class lookup objects and meet you on the other side! Or, better yet, try your hardest and implement the variant classes for `shape`, `tone` and `impact` yourself.

Think you've got it? Great! [Here's](https://github.com/LuukRos/tailwind-multistyle-components/commit/d0990afb38b3bfa4378fa8598df73d2a579b84ff) what I came up with. You'll notice a few things:

- I've reduced and abstracted the base classes into its own variable, to make the `className` attribute for our `<button>` element a bit more readable
- I've combined `tone` and `impact`, as they can be combined. To reiterate: `tone` conveys the 'message' (or colour) of the button, while `impact` conveys the 'weight' (or importance) of the button.
- The `App.tsx` component now shows a list of all different shapes, tones and impacts. These can also be combined. Feel free to add a large, pill-shaped, bordered warning-button, if you'd like.
- There's quite a bit of repetition in our lookup objects - let's see if we can optimise this a bit.

### Optimising our types

We can start by abstracting `Record<NonNullable<..., string>` into its own generic type. This will allow us to reduce repetition ever so slightly and makes future refactors easier. Since we use a nested `Record` for our `tone` classes, we have to try and make a distinction between the two 'flavours' of values for our `Record` - either a `string` or another `Record`. I've opted to take this approach:

```tsx
type ButtonPropsKey = string | undefined;

type LookupObject<T extends ButtonPropsKey, U = string> = Record<
  NonNullable<T>,
  U
>;
```

Here, we create a type called `LookupObject` which accepts two type arguments - `T` and `U`. `T` represents a key of our `ButtonProps` and, seeing as all our properties are optional, means it extends both `string` and `undefined`. I abstracted this into its own `ButtonPropsKey` type as well. `U` represents 'anything' - it is the value for our `Record`. To prevent having to type `string` every single time we implement this type, I assigned a default type value of `string` to it. So what does this look like when implemented?

```tsx
const shapeClasses: LookupObject<ButtonProps["shape"]> = {
  square: "rounded-none",
  // ...
};
```

Simpler lookup objects just reference the type directly, while the nested `tone` and `impact` lookup object appears just slightly more complicated.

```tsx
const toneClasses: LookupObject<
  ButtonProps["tone"],
  LookupObject<ButtonProps["impact"]>
> = {
  default: {
    bold: "bg-sky-500 text-white hover:bg-sky-600 focus-visible:ring-sky-500",
    // ...
  },
  // ...
};
```

If you followed along, your code should look something like [this](https://github.com/LuukRos/tailwind-multistyle-components/commit/0269f5252c094ec651d40d1fcc75f0313c7242a9).

## Conclusion and next steps

And there we have it! You developed a generic and reusable `Button` component that'll allow you to convey different messages across your applications. Obviously, branding and design are subject to change - you'll probably have to make some adjustments to your `Button` component to suit your needs. However, this tutorial gave you a detailed look into how to properly use Tailwind and TypeScript to create reusable components. Although we used React in this tutorial, this approach should easily translate to other popular front-end frameworks like Vue or Svelte.

So where to go from here? Try implementing some additional variants for your button based on different states. What about disabled buttons, or buttons with a loading spinner? I took the liberty to put those in the final code of my GitHub repository as well.

What about documentation? Storybook could be an awesome way to properly document all the different variants (or stories) of our `Button` component!

Give your best shot and try to implement another commonly used UI component using this approach. I'm thinking modals, tooltips, and form elements such as radio buttons and checkboxes.

Also - shameless plug, if you've read my [previous article](https://totheroot.io/article/advanced-tailwind-colour-palettes-made-easy-using-plugins), it might be a cool challenge to use the plugin in your `Button` component.

I hope you learned something new and exciting today. Feel free to look at the final code on my [GitHub profile](https://github.com/LuukRos/tailwind-multistyle-components) and be sure to reach out if you have any questions or feedback. I plan on being back soon with more cool content involving Tailwind CSS, React or TypeScript, so keep your eyes peeled for that.

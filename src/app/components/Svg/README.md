# Our Custom SVG Implementation

## Why We Created This

We needed to use SVG icons in our project, but ran into a common limitation: **we couldn't dynamically change the fill color of SVGs when using them as standard `<Image />` components.** We explored many online solutions, but none worked reliably for our needs.

## How It Works: Custom Components

To solve this, we've built **custom React components for each SVG icon** we use. These components live in the `src/app/components/Svg` folder.

**Key Features:**

-   **Control Fill, Size:** Each SVG component accepts `fill`, `width`, and `height` props, allowing you to easily customize their appearance.
-   **Consistent Typing:** Most components use the `SvgProps` type, defined in `src/app/Types/svg`, ensuring consistent prop handling:

```typescript
export type SvgProps = {
    fill: string;
    width: string;
    height: string;
} & React.HTMLAttributes<SVGElement>;
```

-   **Naming Convention:** SVG components are named descriptively, like `EditSvg` and `DeleteSvg`. This makes them easy to find and understand.

## Using the Components

Simply import and use the specific SVG component you need:

```tsx
import EditSvg from "src/app/components/Svg/edit";

function MyComponent() {
    return (
        <EditSvg
            fill="blue"
            width="24px"
            height="24px"
            onClick={() => console.log("Edit clicked")}
        />
    );
}
```

## Handling Special Cases: Component-Specific Props

Some SVG components require additional props beyond the standard `fill`, `width`, and `height`. For example, the `LockSvg` component has an `isLocked` prop.

**How to Identify Special Props:**

1. **Check the Component File:** Open the specific SVG component file in `src/app/components/Svg`.
2. **Look for a Custom `Props` Type:** If the component defines its own `Props` type (and _doesn't_ just use `SvgProps`), it likely has special props.

**Example (`LockSvg`):**

```tsx
type Props = {
    isLocked: boolean; // This is the special prop
} & SvgProps;

export default function LockSvg(props: Props) {
    const { isLocked, ...rest } = props;
    return isLocked ? <LockedLock {...rest} /> : <UnlockedLock {...rest} />;
}
```

When using `LockSvg`, you'll need to provide the `isLocked` prop:

```tsx
import LockSvg from "src/app/components/Svg/LockSvg";

function SecurityIndicator({ isUserLocked }: { isUserLocked: boolean }) {
    return (
        <LockSvg fill="gray" width="16" height="16" isLocked={isUserLocked} />
    );
}
```

By using these custom SVG components, we gain more control over their styling and can overcome the limitations of using SVGs directly as images. Remember to check the specific component file for any unique props it might require.

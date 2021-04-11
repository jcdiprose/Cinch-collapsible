# Cinch-Collapse

### Cinch Collapse is a minimally styled React collapse and accordian component. It was been developed so that with the least effort you can style it to suit your project.

#### [Demo](https://codesandbox.io/s/keen-allen-ruxfl?file=/src/styles.css&theme=dark)

**v3.0.0 changes**
Removed default padding on Panel

**v2.0.0 changes**

- onChange listener
- className prop

**in order to make use of the onChange listener, each panel must have a unique string id**

#### Collapsible

- accordian?: boolean;
- timeout?: number;
- ease?: "ease" | "inOut" | "in" | "out" | number[];
- delay?: number;
- className?: string;
- onChange?: (ids: string) => void;

#### Panel

- header: string | JSX.Element;
- noPadding?: boolean;
- id?: string
- className?: string

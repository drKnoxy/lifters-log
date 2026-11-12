# Contributor guidance

- Avoid ternary expressions when their condition contains `&&` or `||`; use a named predicate and explicit branching or logical JSX rendering instead.
- Prefer pure functions and immutable transformations such as `map`, `filter`, and `reduce` where they keep data flow clear.
- Prefer structural typing (duck typing) by describing the properties a value needs, rather than adding nominal class hierarchies. Keep interfaces focused on the capabilities callers use.
- Apply these as preferences, not at the expense of readability or type safety.

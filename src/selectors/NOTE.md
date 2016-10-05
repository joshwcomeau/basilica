# A Note on Selectors

Generally, selectors are paired with a reducer, since most of the time, a selector only needs to operate on a single slice of the state.

Sometimes, though, selectors span multiple reducers.

In that case, they can be placed here. This should be the exception, though; not the rule.

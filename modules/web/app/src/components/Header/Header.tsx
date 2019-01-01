/*
 * Copyright (c) 2018-2019 Martin Donath <martin.donath@squidfunk.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

import {
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core"
import * as React from "react"
import {
  compose,
  pure,
  setDisplayName
} from "recompose"

import { Styles, styles } from "./Header.styles"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Header properties
 */
export interface HeaderProps {
  primary: string                      /* Primary text */
  secondary: string                    /* Secondary text */
}

/* ------------------------------------------------------------------------- */

/**
 * Render properties
 */
export type RenderProps =
  & HeaderProps
  & WithStyles<Styles>

/* ----------------------------------------------------------------------------
 * Presentational component
 * ------------------------------------------------------------------------- */

/**
 * Render component
 *
 * @param props - Properties
 *
 * @return JSX element
 */
export const Render: React.FunctionComponent<RenderProps> =
  ({ classes, primary, secondary }) =>
    <div className={classes.root}>
      <Typography variant="headline" className={classes.text}>
        {primary}
      </Typography>
      <Typography className={classes.text}>
        {secondary}
      </Typography>
    </div>

/* ----------------------------------------------------------------------------
 * Enhanced component
 * ------------------------------------------------------------------------- */

/**
 * Enhance component
 *
 * @return Component enhancer
 */
export function enhance() {
  return compose<RenderProps, HeaderProps>(
    withStyles(styles),
    pure,
    setDisplayName("Header")
  )
}

/**
 * Header component
 */
export const Header = enhance()(Render)

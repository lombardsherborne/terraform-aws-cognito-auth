/*
 * Copyright (c) 2018 Martin Donath <martin.donath@squidfunk.com>
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
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core"
import * as React from "react"
import {
  branch,
  compose,
  pure,
  renderComponent,
  withProps
} from "recompose"

import {
  AuthenticateRequestWithCredentials as AuthenticateRequest,
  Session
} from "common"
import {
  Alert,
  Form,
  FormButton,
  FormInput,
  FormPassword,
  Header,
  TextLink
} from "components"
import {
  WithForm,
  withForm,
  WithFormProps
} from "enhancers"

import { Styles, styles } from "./Authenticate.styles"
import { AuthenticateRedirect } from "./AuthenticateRedirect"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Authentication render properties
 */
export type AuthenticateRenderProps =
  & WithStyles<Styles>
  & WithForm<AuthenticateRequest, Session<string>>

/* ----------------------------------------------------------------------------
 * Presentational component
 * ------------------------------------------------------------------------- */

/**
 * Authentication render component
 *
 * @param props - Properties
 *
 * @return JSX element
 */
export const AuthenticateRender: React.SFC<AuthenticateRenderProps> =
  ({ classes, form, request, handleChange, handleSubmit }) =>
    <div>
      <Header
        primary={window.env.COGNITO_IDENTITY_POOL_NAME}
        secondary="Sign in to your account"
      />
      <Alert display={!!form.err} success={form.success} err={form.err} />
      <Form onSubmit={handleSubmit}>
        <FormInput
          name="username" label="Email address" required
          value={request.username} InputProps={{ readOnly: form.pending }}
          onChange={handleChange} autoComplete="username"
        />
        <FormPassword
          name="password" label="Password" required
          value={request.password} InputProps={{ readOnly: form.pending }}
          onChange={handleChange} autoComplete="new-password"
        />
        <FormGroup row className={classes.controls}>
          <FormControlLabel label="Remember me" control={
            <Checkbox
              name="remember" checked={request.remember}
              onChange={handleChange}
            />
          } />
          <Typography className={classes.forgotPassword}>
            <TextLink to="/reset" tabIndex={-1}>
              Forgot password?
            </TextLink>
          </Typography>
        </FormGroup>
        <FormButton disabled={form.pending}>
          Sign in
        </FormButton>
        <Typography className={classes.register}>
          Don't have an account? <TextLink to="/register">
            Register
          </TextLink>
        </Typography>
      </Form>
    </div>

/* ----------------------------------------------------------------------------
 * Enhanced component
 * ------------------------------------------------------------------------- */

/**
 * Authentication component
 */
export const Authenticate =
  compose<AuthenticateRenderProps, {}>(
    withStyles(styles),
    withProps<WithFormProps<AuthenticateRequest>, {}>(() => ({
      target: "/authenticate",
      initial: {
        username: "",
        password: "",
        remember: false
      }
    })),
    withForm<AuthenticateRequest, Session<string>>(),
    branch<AuthenticateRenderProps>(
      ({ form }) => form.success,
      renderComponent(AuthenticateRedirect)
    ),
    pure
  )(AuthenticateRender)
"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const strapiAdmin = require("@strapi/admin/strapi-admin");
const designSystem = require("@strapi/design-system");
const icons = require("@strapi/icons");
const reactIntl = require("react-intl");
const reactQuery = require("react-query");
const styledComponents = require("styled-components");
const yup = require("yup");
const index = require("./index-BcbwpIZL.js");
function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const React__namespace = /* @__PURE__ */ _interopNamespace(React);
const yup__namespace = /* @__PURE__ */ _interopNamespace(yup);
const extractValuesFromYupError = (errorType, errorParams) => {
  if (!errorType || !errorParams) {
    return {};
  }
  return {
    [errorType]: errorParams[errorType]
  };
};
const getYupInnerErrors = (error) => (error?.inner || []).reduce((acc, currentError) => {
  if (currentError.path) {
    acc[currentError.path.split("[").join(".").split("]").join("")] = {
      id: currentError.message,
      defaultMessage: currentError.message,
      values: extractValuesFromYupError(currentError?.type, currentError?.params)
    };
  }
  return acc;
}, {});
const schema = yup__namespace.object().shape({
  email: yup__namespace.string().email(strapiAdmin.translatedErrors.email.id).required(strapiAdmin.translatedErrors.required.id)
});
const DocumentationLink = styledComponents.styled.a`
  color: ${({ theme }) => theme.colors.primary600};
`;
const ProtectedSettingsPage = () => /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Protect, { permissions: index.PERMISSIONS.settings, children: /* @__PURE__ */ jsxRuntime.jsx(SettingsPage, {}) });
const SettingsPage = () => {
  const { toggleNotification } = strapiAdmin.useNotification();
  const { formatMessage } = reactIntl.useIntl();
  const { get, post } = strapiAdmin.useFetchClient();
  const [testAddress, setTestAddress] = React__namespace.useState("");
  const [isTestAddressValid, setIsTestAddressValid] = React__namespace.useState(false);
  const [formErrors, setFormErrors] = React__namespace.useState({});
  const { data, isLoading } = reactQuery.useQuery(["email", "settings"], async () => {
    const res = await get("/email/settings");
    const {
      data: { config }
    } = res;
    return config;
  });
  const mutation = reactQuery.useMutation(
    async (body) => {
      await post("/email/test", body);
    },
    {
      onError() {
        toggleNotification({
          type: "danger",
          message: formatMessage(
            {
              id: "email.Settings.email.plugin.notification.test.error",
              defaultMessage: "Failed to send a test mail to {to}"
            },
            { to: testAddress }
          )
        });
      },
      onSuccess() {
        toggleNotification({
          type: "success",
          message: formatMessage(
            {
              id: "email.Settings.email.plugin.notification.test.success",
              defaultMessage: "Email test succeeded, check the {to} mailbox"
            },
            { to: testAddress }
          )
        });
      },
      retry: false
    }
  );
  React__namespace.useEffect(() => {
    schema.validate({ email: testAddress }, { abortEarly: false }).then(() => setIsTestAddressValid(true)).catch(() => setIsTestAddressValid(false));
  }, [testAddress]);
  const handleChange = (event) => {
    setTestAddress(() => event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await schema.validate({ email: testAddress }, { abortEarly: false });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setFormErrors(getYupInnerErrors(error));
      }
    }
    mutation.mutate({ to: testAddress });
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Loading, {});
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(strapiAdmin.Page.Main, { labelledBy: "title", "aria-busy": isLoading || mutation.isLoading, children: [
    /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Title, { children: formatMessage(
      { id: "Settings.PageTitle", defaultMessage: "Settings - {name}" },
      {
        name: formatMessage({
          id: "email.Settings.email.plugin.title",
          defaultMessage: "Configuration"
        })
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      strapiAdmin.Layouts.Header,
      {
        id: "title",
        title: formatMessage({
          id: "email.Settings.email.plugin.title",
          defaultMessage: "Configuration"
        }),
        subtitle: formatMessage({
          id: "email.Settings.email.plugin.subTitle",
          defaultMessage: "Test the settings for the Email plugin"
        })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Layouts.Content, { children: data && /* @__PURE__ */ jsxRuntime.jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 7, children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Box,
        {
          background: "neutral0",
          hasRadius: true,
          shadow: "filterShadow",
          paddingTop: 6,
          paddingBottom: 6,
          paddingLeft: 7,
          paddingRight: 7,
          children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
            /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", tag: "h2", children: formatMessage({
                id: "email.Settings.email.plugin.title.config",
                defaultMessage: "Configuration"
              }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: formatMessage(
                {
                  id: "email.Settings.email.plugin.text.configuration",
                  defaultMessage: "The plugin is configured through the {file} file, checkout this {link} for the documentation."
                },
                {
                  file: "./config/plugins.js",
                  link: /* @__PURE__ */ jsxRuntime.jsx(
                    DocumentationLink,
                    {
                      href: "https://docs.strapi.io/developer-docs/latest/plugins/email.html",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      children: formatMessage({
                        id: "email.link",
                        defaultMessage: "Link"
                      })
                    }
                  )
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid.Root, { gap: 5, children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, s: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { name: "shipper-email", children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
                  id: "email.Settings.email.plugin.label.defaultFrom",
                  defaultMessage: "Default sender email"
                }) }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.TextInput,
                  {
                    placeholder: formatMessage({
                      id: "email.Settings.email.plugin.placeholder.defaultFrom",
                      defaultMessage: "ex: Strapi No-Reply '<'no-reply@strapi.io'>'"
                    }),
                    disabled: true,
                    value: data.settings.defaultFrom
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, s: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { name: "response-email", children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
                  id: "email.Settings.email.plugin.label.defaultReplyTo",
                  defaultMessage: "Default response email"
                }) }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.TextInput,
                  {
                    placeholder: formatMessage({
                      id: "email.Settings.email.plugin.placeholder.defaultReplyTo",
                      defaultMessage: `ex: Strapi '<'example@strapi.io'>'`
                    }),
                    disabled: true,
                    value: data.settings.defaultReplyTo
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, s: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { name: "email-provider", children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
                  id: "email.Settings.email.plugin.label.provider",
                  defaultMessage: "Email provider"
                }) }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelect, { disabled: true, value: data.provider, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: data.provider, children: data.provider }) })
              ] }) })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs(
        designSystem.Flex,
        {
          alignItems: "stretch",
          background: "neutral0",
          direction: "column",
          gap: 4,
          hasRadius: true,
          shadow: "filterShadow",
          paddingTop: 6,
          paddingBottom: 6,
          paddingLeft: 7,
          paddingRight: 7,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", tag: "h2", children: formatMessage({
              id: "email.Settings.email.plugin.title.test",
              defaultMessage: "Test email delivery"
            }) }),
            /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid.Root, { gap: 5, children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, s: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsxs(
                designSystem.Field.Root,
                {
                  name: "test-address",
                  error: formErrors.email?.id && formatMessage({
                    id: `email.${formErrors.email?.id}`,
                    defaultMessage: "This is not a valid email"
                  }),
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
                      id: "email.Settings.email.plugin.label.testAddress",
                      defaultMessage: "Recipient email"
                    }) }),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      designSystem.TextInput,
                      {
                        onChange: handleChange,
                        value: testAddress,
                        placeholder: formatMessage({
                          id: "email.Settings.email.plugin.placeholder.testAddress",
                          defaultMessage: "ex: developer@example.com"
                        })
                      }
                    )
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 7, s: 12, direction: "column", alignItems: "start", children: /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Button,
                {
                  loading: mutation.isLoading,
                  disabled: !isTestAddressValid,
                  type: "submit",
                  startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Mail, {}),
                  children: formatMessage({
                    id: "email.Settings.email.plugin.button.test-email",
                    defaultMessage: "Send test email"
                  })
                }
              ) })
            ] })
          ]
        }
      )
    ] }) }) })
  ] });
};
exports.ProtectedSettingsPage = ProtectedSettingsPage;
//# sourceMappingURL=Settings-DzVN5TCM.js.map

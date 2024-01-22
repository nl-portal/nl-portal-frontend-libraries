export const formIoUploaderEditForm = () => ({
  components: [
    {key: 'type', type: 'hidden'},
    {
      type: 'textfield',
      input: true,
      key: 'label',
      label: 'Label',
      placeholder: 'Label',
      validate: {
        required: true,
      },
    },
    {
      type: 'textfield',
      input: true,
      key: 'key',
      label: 'Property Name',
      placeholder: 'Property Name',
      tooltip: 'The name of this field in the API endpoint.',
      validate: {
        required: true,
      },
    },
    {
      type: 'checkbox',
      input: true,
      inputType: 'checkbox',
      key: 'multipleFiles',
      label: 'Multiple',
      tooltip: 'Allow multiple files to be uploaded.',
      defaultValue: true,
      validate: {
        required: false,
      },
    },
  ],
});

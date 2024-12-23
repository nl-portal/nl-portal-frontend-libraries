type BasicFormIoComponentSchema = {
  /**
   * The type of component
   */
  type?: string;

  /**
   * The data key for this component (how the data is stored in the database, referenced as API key in docs).
   */
  key?: string;

  /**
   * The HTML label to give this component.
   */
  label?: string;

  /**
   * The input placeholder for this component.
   */
  placeholder?: string;

  /**
   * Option to disable the input for this component
   */
  disabled?: boolean;
};

export default BasicFormIoComponentSchema;

import styled from 'styled-components';

const FormGroup = styled.div`
  position: relative;
  margin-bottom: 1.5rem;

  .form-label {
    display: inline-block;
    font-weight: 500;
    margin-bottom: 0.3rem;
  }

  .action-toolbar {
    &.active {
      display: block;
    }

    display: none;
    position: absolute;
    top: 0;
    right: 0;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  &:hover .action-toolbar {
    display: block;
  }

  .form-control {
    display: block;
    width: 100%;
    height: calc(1.47em + 1rem + 2px);
    padding: 0.5rem 0.875rem;
    font-size: 0.8125rem;
    font-weight: 400;
    line-height: 1.47;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    -webkit-transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;

    &:focus {
      color: #495057;
      background-color: #fff;
      border-color: #886ab5;
      outline: 0;
      -webkit-box-shadow: 0 0 0 0.2rem transparent;
      box-shadow: 0 0 0 0.2rem transparent;
    }
  }

  .input-group {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    width: 100%;
  }
  .input-group > .form-control,
  .input-group > .form-control-plaintext,
  .input-group > .custom-select,
  .input-group > .custom-file {
    position: relative;
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    width: 1%;
    margin-bottom: 0;
  }
  .input-group > .form-control + .form-control,
  .input-group > .form-control + .custom-select,
  .input-group > .form-control + .custom-file,
  .input-group > .form-control-plaintext + .form-control,
  .input-group > .form-control-plaintext + .custom-select,
  .input-group > .form-control-plaintext + .custom-file,
  .input-group > .custom-select + .form-control,
  .input-group > .custom-select + .custom-select,
  .input-group > .custom-select + .custom-file,
  .input-group > .custom-file + .form-control,
  .input-group > .custom-file + .custom-select,
  .input-group > .custom-file + .custom-file {
    margin-left: -1px;
  }
  .input-group > .form-control:focus,
  .input-group > .custom-select:focus,
  .input-group > .custom-file .custom-file-input:focus ~ .custom-file-label {
    z-index: 3;
  }
  .input-group > .custom-file .custom-file-input:focus {
    z-index: 4;
  }
  .input-group > .form-control:not(:last-child),
  .input-group > .custom-select:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .input-group > .form-control:not(:first-child),
  .input-group > .custom-select:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .input-group > .custom-file {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .input-group > .custom-file:not(:last-child) .custom-file-label,
  .input-group > .custom-file:not(:last-child) .custom-file-label::after {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .input-group > .custom-file:not(:first-child) .custom-file-label {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .input-group-prepend,
  .input-group-append {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .input-group-prepend .btn,
  .input-group-append .btn {
    position: relative;
    z-index: 2;
  }
  .input-group-prepend .btn:focus,
  .input-group-append .btn:focus {
    z-index: 3;
  }
  .input-group-prepend .btn + .btn,
  .input-group-prepend .btn + .input-group-text,
  .input-group-prepend .input-group-text + .input-group-text,
  .input-group-prepend .input-group-text + .btn,
  .input-group-append .btn + .btn,
  .input-group-append .btn + .input-group-text,
  .input-group-append .input-group-text + .input-group-text,
  .input-group-append .input-group-text + .btn {
    margin-left: -1px;
  }

  .input-group-prepend {
    margin-right: -1px;
  }

  .input-group-append {
    margin-left: -1px;
  }

  .input-group-text {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 0.5rem 0.875rem;
    margin-bottom: 0;
    font-size: 0.8125rem;
    font-weight: 400;
    line-height: 1.47;
    color: #495057;
    text-align: center;
    white-space: nowrap;
    background-color: #f3f3f3;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    -webkit-transition: all 0.15s ease-in-out;
    transition: all 0.15s ease-in-out;
    transition-property: all;
    transition-duration: 0.15s;
    transition-timing-function: ease-in-out;
    transition-delay: 0s;
  }
  .input-group-text input[type='radio'],
  .input-group-text input[type='checkbox'] {
    margin-top: 0;
  }

  .input-group-lg > .form-control:not(textarea),
  .input-group-lg > .custom-select {
    height: calc(1.5em + 1.5rem + 2px);
  }

  .input-group-lg > .form-control,
  .input-group-lg > .custom-select,
  .input-group-lg > .input-group-prepend > .input-group-text,
  .input-group-lg > .input-group-append > .input-group-text,
  .input-group-lg > .input-group-prepend > .btn,
  .input-group-lg > .input-group-append > .btn {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 4px;
  }

  .input-group-sm > .form-control:not(textarea),
  .input-group-sm > .custom-select {
    height: calc(1.5em + 0.75rem + 2px);
  }

  .input-group-sm > .form-control,
  .input-group-sm > .custom-select,
  .input-group-sm > .input-group-prepend > .input-group-text,
  .input-group-sm > .input-group-append > .input-group-text,
  .input-group-sm > .input-group-prepend > .btn,
  .input-group-sm > .input-group-append > .btn {
    padding: 0.375rem 0.844rem;
    font-size: 0.75rem;
    line-height: 1.5;
    border-radius: 4px;
  }

  .input-group-lg > .custom-select,
  .input-group-sm > .custom-select {
    padding-right: 1.875rem;
  }

  .input-group > .input-group-prepend > .btn,
  .input-group > .input-group-prepend > .input-group-text,
  .input-group > .input-group-append:not(:last-child) > .btn,
  .input-group > .input-group-append:not(:last-child) > .input-group-text,
  .input-group > .input-group-append:last-child > .btn:not(:last-child):not(.dropdown-toggle),
  .input-group > .input-group-append:last-child > .input-group-text:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .input-group > .input-group-append > .btn,
  .input-group > .input-group-append > .input-group-text,
  .input-group > .input-group-prepend:not(:first-child) > .btn,
  .input-group > .input-group-prepend:not(:first-child) > .input-group-text,
  .input-group > .input-group-prepend:first-child > .btn:not(:first-child),
  .input-group > .input-group-prepend:first-child > .input-group-text:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .has-length .input-group-text {
    border-color: #886ab5;
  }
  .has-length .input-group-text + .input-group-text {
    border-left: 1px solid rgba(0, 0, 0, 0.1);
  }

  .has-length .input-group-text:not([class^='bg-']):not([class*=' bg-']) {
    background: #886ab5;
    color: #fff !important;
  }
`;

export default FormGroup;

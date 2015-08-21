from django import forms


class SubscriptionForm(forms.Form):
    # login input
    login = forms.CharField(
        max_length=50,
        help_text="Login")
    # email input (to contact user in case of need)
    email = forms.EmailField(
        max_length=50,
        help_text="Email address")
    # Set the widget to PasswordInput
    password = forms.CharField(
        max_length=50,
        widget=forms.PasswordInput,
        help_text="Password")
    # Set the widget to PasswordInput and set an appropriate label
    password2 = forms.CharField(
        max_length=50,
        widget=forms.PasswordInput,
        label="Confirm password",
        help_text="Repeat password")

    # clean_<fieldname> method in a form class is used to do custom validation
    # for the field.
    # We are doing a custom validation for the 'password2' field and raising
    # a validation error if the password and its confirmation do not match
    def clean_password2(self):
        # cleaned_data dictionary has the the valid fields
        password = self.cleaned_data['password']
        password2 = self.cleaned_data['password2']
        if password != password2:
            raise forms.ValidationError("Passwords do not match.")
        return password2


class LoginForm(forms.Form):
    # login input
    username = forms.CharField(
        max_length=50,
        help_text="Login")
    # password input
    password = forms.CharField(
        max_length=50,
        widget=forms.PasswordInput,
        help_text="Password")

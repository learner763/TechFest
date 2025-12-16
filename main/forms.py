from django import forms
from django.core.validators import FileExtensionValidator

# Validator for file size
'''

def validate_file_size(value):
    max_size = 1024 * 1024  # 1MB
    if value.size > max_size:
        raise forms.ValidationError("File size must be smaller than 1MB.")

class FileUploadForm(forms.Form):
    image = forms.FileField(
        validators=[
            FileExtensionValidator(allowed_extensions=['png', 'jpg', 'jpeg']),
            validate_file_size
        ]
    )

class registrationForm(forms.Form):
    username=forms.CharField(
        max_length=15,
        required=True
    )
    password=forms.CharField(
        max_length=15,
        required=True,
    )
    fullname=forms.CharField(
        max_length=15,
        required=True
    )'''
'''
class StudentsForm(forms.Form):
    name=forms.CharField(
        max_length=20,
        required=True
    )
    age=forms.IntegerField(
        required=True,
        min_value=20,
        max_value=25
    )
    cgpa=forms.FloatField(
        required=True,
        min_value=0.0,
        max_value=4.0
    )
class file_upload(forms.Form):
    image = forms.FileField(
        validators=[FileExtensionValidator(allowed_extensions=['png', 'jpg', 'jpeg'])]
    )
    '''

from django import forms
from core.models import SocialPost


class SocialPostForm(forms.ModelForm):
    social = forms.CharField(required=False)

    class Meta:
        model = SocialPost
        fields = "__all__"
    
    def clean_social(self):
        value = ', '.join(self.data.getlist('social[]'))
        return value
    
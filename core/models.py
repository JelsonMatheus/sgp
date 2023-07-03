from django.db import models


class SocialPost(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    date_scheduling = models.DateTimeField()
    social = models.CharField(max_length=225)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


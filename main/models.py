# main/models.py
from django.db import models

'''

class Students(models.Model):
    name = models.CharField()
    age = models.IntegerField()
    cgpa = models.FloatField()

    def __str__(self):
        return self.name

        #pzkq xrcj znlj pklz

class emails(models.Model):
    email = models.EmailField()
    Otp= models.CharField(max_length=6)
    def __str__(self):
        return self.email
        
class admin_person(models.Model):
    first_name = models.CharField()
    last_name = models.CharField()
    email = models.CharField()
    password = models.CharField()
    phone= models.CharField()
    mode= models.CharField()
    group= models.CharField()

    def __str__(self):
        return self.email
class subusers(models.Model):
    first_name = models.CharField()
    last_name = models.CharField()
    email = models.CharField()
    password = models.CharField()
    phone= models.CharField()
    mode= models.CharField()
    def __str__(self):
        return self.email
        '''
class techfest_participants(models.Model):
    email = models.CharField()
    password = models.CharField()
    fullname= models.CharField()
    otp= models.CharField()
    token= models.CharField(null=True)
    events=models.JSONField(default=list)
    def __str__(self):
        return self.email
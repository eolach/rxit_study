from django.db import models
from rest_framework import serializers

class Nester_model(models.Model):
    nester_name = models.CharField(max_length=100, blank=True, default='')
    nester_number  = models.FloatField(default=0)
    nester_description = models.CharField(max_length=100, blank=True, default='')


class Nest_model(models.Model):
    nest_name = models.CharField(max_length=100, blank=True, default='')
    nest_number  = models.FloatField(default=0)
    nest_description = models.CharField(max_length=100, blank=True, default='')
    nester_model = models.OneToOneField(Nester_model, 
        on_delete=models.CASCADE,
        primary_key=True,)

class Test_model(models.Model):
    model_name = models.CharField(max_length=100, blank=True, default='')
    model_number  = models.FloatField(default=0)
    nest_model = models.OneToOneField(Nest_model, 
        on_delete=models.CASCADE,
        primary_key=True,
    )

class Nester_modelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Nester_model
        fields = ('id',
            'nester_name',
            'nester_number',
            'nester_description'
            )
class Nest_modelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Nest_model
        fields = (
            'nest_name',
            'nest_number',
            'nest_description',
            'nester_model'
            )
            
class Test_modelSerializer(serializers.ModelSerializer):
 
    nest_model = Nest_modelSerializer()
    
    class Meta:
        model = Test_model
        fields = ( 
            'model_name',
            'model_number',
            'nest_model'
            )
    def create(self, validated_data):
        nest_data = validated_data.pop('nest_model')
        nest_model = Nest_modelSerializer.create(Nest_modelSerializer(), validated_data=nest_data)
        test_model, created = Test_model.objects.update_or_create(nest_model=nest_model, **validated_data)
        
        return test_model

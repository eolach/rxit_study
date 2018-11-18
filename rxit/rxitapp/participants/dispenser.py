from django.db import models
from rest_framework import serializers

class DispStat(models.Model):
    username = models.CharField(max_length=100, default='text')
    # dispenser = models.ForeignKey(Dispenser, related_name='statistics', on_delete=models.CASCADE)
    total_prescriptions = models.FloatField(default=0)
    
    def __str__(self):
        return self.name


class Dispenser(models.Model):
    username = models.CharField(max_length=100, blank=True, default='')
    participant_name = models.CharField(max_length=100, blank=True, default='')
    street = models.CharField(max_length=100, blank=True, default='') 
    city = models.CharField(max_length=100, blank=True, default='')
    province = models.CharField(max_length=100, blank=True, default='')
    corporate_type = models.CharField(max_length=100, blank=True, default='')
    statistics = models.OneToOneField(
        DispStat,
        on_delete=models.CASCADE,
        default='0',
        primary_key=True
    ) 
    def __str__(self):
        return self.username

# Serializers
""" class DispStatisticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DispStatistics
        fields = ('username', 'total_prescriptions')
        """

class DispenserSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Dispenser
        fields = ('id', 
            'participant_name', 
            'street',
            'city',
            'province',
            'corporate_type'
            )

        """   def create(self, validated_data):
        # The first part just makes the primary object - the dispenser.
        # This inclues a field that points to the fields of the nested object - the statistics
        dispenser = Dispenser.objects.create(**validated_data) # Create a new dispenser object with the form data
        # The next part gets the specific data for the nested object
        statistics_data = validated_data.pop('statistics') # get the field data from the form
        # Then for each field in the newly nested object of the primary object
        for statistic_field in statistics_data: # for each data point in the fields of the form
            #  Create a field inside the nested object field using the key: value pair of the validated data
            DispStatistics.objects.create(dispenser=dispenser, **statistic_field) # create a seriali
        return dispenser


    def update(self, instance, validated_data):
        # The dispenser exists already. Get the data for the fields to be updated
        statistics_data = validated_data.pop('statistics') # get the field data from the form
        # Then for each field in the newly nested object of the primary object
        statistics_fields = instance.statistics
        for attr, value in statistics_data.items():
            setattr(statistics_fields, attr, value)
        statistics_fields.username =statistics_data.get("username", statistics_fields.username)
        statistics_fields.save()
        # statistics_fields.update(**statistics_data)
        return instance 



        setattr(instance, attr, value)
    instance.save()
"""
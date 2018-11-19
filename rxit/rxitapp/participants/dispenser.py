from django.db import models
from rest_framework import serializers

# Field sets for dispenser
# Numbers
class Numbers(models.Model):
    num_parmacists = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    num_reg_tech = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    num_unreg = models.DecimalField(max_digits=3, decimal_places=1, default=0)

# RxStats
class RxStats(models.Model):
    num_am = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    num_pm = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    num_evng = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    num_wend = models.DecimalField(max_digits=4, decimal_places=1, default=0)

# TxTime
# TxWho
# RxReview
# Communication



class Dispenser(models.Model):
    username = models.CharField(max_length=100, blank=True, default='')
    participant_name = models.CharField(max_length=100, blank=True, default='')
    street = models.CharField(max_length=100, blank=True, default='') 
    city = models.CharField(max_length=100, blank=True, default='')
    province = models.CharField(max_length=100, blank=True, default='')
    corporate_type = models.CharField(max_length=100, blank=True, default='')
    pharmacy_mgt_system = models.CharField(max_length=100, blank=True, default='')
    numbers = models.OneToOneField(
        Numbers,
        on_delete=models.CASCADE,
        # primary_key=True
    ) 
    rx_stats = models.OneToOneField(
        RxStats,
        on_delete=models.CASCADE,
        # primary_key=True
    ) 
    def __str__(self):
        return self.username


# Serializers
class RxStatsSerializer(serializers.ModelSerializer):

    class Meta:
        model = RxStats
        fields = ('id',
            'num_am',
            'num_pm',
            'num_evng',
            'num_wend'
            )

class NumbersSerializer(serializers.ModelSerializer):

    class Meta:
        model = Numbers
        fields = ('id',
            'num_parmacists',
            'num_reg_tech',
            'num_unreg'
            )

class DispenserSerializer(serializers.ModelSerializer):

    numbers = NumbersSerializer()
    rx_stats = RxStatsSerializer()

    class Meta:
        model = Dispenser
        fields = ('username',
            'participant_name',
            'street',
            'city',
            'province',
            'corporate_type',
            'numbers',
            'pharmacy_mgt_system',
            'rx_stats'
        )

    def create(self, validated_data):
        numbers_data = validated_data.pop('numbers')
        rx_stats_data = validated_data.pop('rx_stats')
        numbers_model = NumbersSerializer.create(NumbersSerializer(), validated_data=numbers_data)
        rx_stats_model = RxStatsSerializer.create(RxStatsSerializer(), validated_data=rx_stats_data)
        dispenser_model, created = Dispenser.objects.update_or_create(numbers=numbers_model, rx_stats=rx_stats_model, **validated_data)
        
        return dispenser_model
            
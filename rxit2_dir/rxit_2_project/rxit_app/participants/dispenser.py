from django.db import models
from rest_framework import serializers
from drf_writable_nested import WritableNestedModelSerializer

# Field sets for dispenser

class Dispenser(models.Model):
    username = models.CharField(max_length=100, blank=True, default='')

    def __str__(self):
        return self.username


# Description
class Description(models.Model):
    dispenser = models.OneToOneField(
        Dispenser,
        on_delete=models.CASCADE,
    ) 
       
    participant_name = models.CharField(max_length=100, blank=True, default='')
    street = models.CharField(max_length=100, blank=True, default='') 
    city = models.CharField(max_length=100, blank=True, default='')
    province = models.CharField(max_length=100, blank=True, default='')
    corporate_type = models.CharField(max_length=100, blank=True, default='')
    pharmacy_mgt_system = models.CharField(max_length=100, blank=True, default='')


# Numbers
class Numbers(models.Model):
    dispenser = models.OneToOneField(
        Dispenser,
        on_delete=models.CASCADE,
    ) 
    num_pharmacists = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    num_reg_tech = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    num_unreg = models.DecimalField(max_digits=3, decimal_places=1, default=0)

# RxStats
class RxStats(models.Model):
    dispenser = models.OneToOneField(
        Dispenser,
        on_delete=models.CASCADE,
    ) 
    num_am = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    num_pm = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    num_evng = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    num_wend = models.DecimalField(max_digits=4, decimal_places=1, default=0)


"""
# TxTime
# TxRole
# RxReview
# Communication


"""
# Serializers

class RxStatsSerializer(serializers.ModelSerializer):

    class Meta:
        model = RxStats
        fields = ('pk',
            'num_am',
            'num_pm',
            'num_evng',
            'num_wend'
            )

class NumbersSerializer(serializers.ModelSerializer):

    class Meta:
        model = Numbers
        fields = ('pk',
            'num_pharmacists',
            'num_reg_tech',
            'num_unreg'
            )

class DescriptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Description
        fields = ('pk',
            'participant_name',
            'street',
            'city',
            'province',
            'corporate_type', 
            'pharmacy_mgt_system'
        )

class DispenserSerializer(WritableNestedModelSerializer):

    description = DescriptionSerializer()
    numbers = NumbersSerializer()
    total_rx = RxStatsSerializer()
    # walk_in_rx = RxStatsSerializer()

    class Meta:
        model = Dispenser
        fields = ('pk',
            'username',
            'description',
            'numbers',
            'total_rx'
        )

            
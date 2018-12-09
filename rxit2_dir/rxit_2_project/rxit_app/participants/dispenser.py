from django.db import models
from rest_framework import serializers

# Field sets for dispenser

# Description
class Description(models.Model):
    username = models.CharField(max_length=100, blank=True, default='')
    participant_name = models.CharField(max_length=100, blank=True, default='')
    street = models.CharField(max_length=100, blank=True, default='') 
    city = models.CharField(max_length=100, blank=True, default='')
    province = models.CharField(max_length=100, blank=True, default='')
    corporate_type = models.CharField(max_length=100, blank=True, default='')
    pharmacy_mgt_system = models.CharField(max_length=100, blank=True, default='')


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
    description = models.ForeignKey(
        Description,
        on_delete=models.CASCADE,
        # primary_key=True
    )    
    numbers = models.ForeignKey(
        Numbers,
        on_delete=models.CASCADE,
        # primary_key=True
    ) 
    total_rx = models.ForeignKey(
        RxStats,
        related_name = '+',
        on_delete=models.CASCADE,
        # primary_key=True
    ) 
    walk_in_rx = models.ForeignKey(
        RxStats,
        related_name = '+',
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

class DescriptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Description
        fields = (
            'username',
            'participant_name',
            'street',
            'city',
            'province',
            'corporate_type', 
            'pharmacy_mgt_system'           )

class DispenserSerializer(serializers.ModelSerializer):

    description = DescriptionSerializer()
    numbers = NumbersSerializer()
    total_rx = RxStatsSerializer()
    walk_in_rx = RxStatsSerializer()

    class Meta:
        model = Dispenser
        fields = ('id',
            'description',
            'numbers',
            'total_rx',
            'walk_in_rx'
        )

    def create(self, validated_data):
        description_data = validated_data.pop('description')
        numbers_data = validated_data.pop('numbers')
        total_rx_data = validated_data.pop('total_rx')
        walk_in_rx_data = validated_data.pop('walk_in_rx')
        description_model = NumbersSerializer.create(DescriptionSerializer(), validated_data=description_data)
        numbers_model = NumbersSerializer.create(NumbersSerializer(), validated_data=numbers_data)
        total_rx_model = RxStatsSerializer.create(RxStatsSerializer(), validated_data=total_rx_data)
        walk_in_rx_model = RxStatsSerializer.create(RxStatsSerializer(), validated_data=walk_in_rx_data)
        dispenser_model, created = Dispenser.objects.update_or_create(
            description=description_model, 
            numbers=numbers_model, 
            total_rx=total_rx_model, 
            walk_in_rx=walk_in_rx_model, 
            **validated_data)
        
        return dispenser_model

    def update(self, instance, validated_data):
        # Gather the field set data
        description_data = validated_data.pop('description')
        numbers_data = validated_data.pop('numbers')
        total_rx_data = validated_data.pop('total_rx')
        walk_in_rx_data = validated_data.pop('walk_in_rx')
        # rebuild the fieldsets
        description_model = NumbersSerializer.create(DescriptionSerializer(), validated_data=description_data)
        numbers_model = NumbersSerializer.create(NumbersSerializer(), validated_data=numbers_data)
        total_rx_model = RxStatsSerializer.create(RxStatsSerializer(), validated_data=total_rx_data)
        walk_in_rx_model = RxStatsSerializer.create(RxStatsSerializer(), validated_data=walk_in_rx_data)
        instance, created = Dispenser.objects.update_or_create(
            description=description_model, 
            numbers=numbers_model, 
            total_rx=total_rx_model, 
            walk_in_rx=walk_in_rx_model, 
            **validated_data)
        
        return instance
            
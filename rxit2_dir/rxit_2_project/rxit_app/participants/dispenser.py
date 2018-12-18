from django.db import models
from rest_framework import serializers
from drf_writable_nested import WritableNestedModelSerializer

# Field sets for dispenser


# Description
class RxDescription(models.Model):
    participant_name = models.CharField(max_length=100, blank=True, default='')
    street = models.CharField(max_length=100, blank=True, default='') 
    city = models.CharField(max_length=100, blank=True, default='')
    province = models.CharField(max_length=100, blank=True, default='')
    corporate_type = models.CharField(max_length=100, blank=True, default='')
    pharmacy_mgt_system = models.CharField(max_length=100, blank=True, default='')

# Numbers
class Numbers(models.Model):
    num_pharmacists = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    num_reg_tech = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    num_unreg = models.DecimalField(max_digits=3, decimal_places=1, default=0)

    num_am = models.DecimalField(max_digits=4, decimal_places=1, default=0)
# RxStats
class RxStats(models.Model):
    num_am = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    num_pm = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    num_evng = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    num_wend = models.DecimalField(max_digits=4, decimal_places=1, default=0) 
    stats_notes = models.CharField(max_length=300, blank=True, default='')

# RxProcess
class RxProcess(models.Model):
    num_new_pt = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    num_new_rx = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    num_rpt_rx = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    pharm_ip = models.BooleanField(default=False)
    reg_ip = models.BooleanField(default=False)
    unreg_ip = models.BooleanField(default=False)

# RxReview
class RxReview(models.Model):
    before_rx = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    after_rx = models.DecimalField(max_digits=4, decimal_places=1, default=0)
 
# Communication
class RxComm(models.Model):
    daily_duration = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    daily_freq = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    daily_elapsed = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    by_fax = models.BooleanField(default=False)
    by_phone = models.BooleanField(default=False)
    by_dm = models.BooleanField(default=False)

class Dispenser(models.Model):
    description = models.OneToOneField(
        RxDescription,
        on_delete=models.CASCADE,
    )
    numbers = models.OneToOneField(
        Numbers,
        on_delete=models.CASCADE,
    ) 
    total_rx = models.ForeignKey(
        RxStats,
        related_name='total_rx',
        on_delete=models.CASCADE,
    ) 
    walkin_rx = models.ForeignKey(
        RxStats,
        related_name='walkin_rx',
        on_delete=models.CASCADE,
    ) 
    faxed_rx = models.ForeignKey(
        RxStats,
        related_name='faxed_rx',
        on_delete=models.CASCADE,
    ) 
    e_prescribe_rx = models.ForeignKey(
        RxStats,
        related_name='e_prescribe_rx',
        on_delete=models.CASCADE,
    ) 
    phoned_rx = models.ForeignKey(
        RxStats,
        related_name='phoned_rx',
        on_delete=models.CASCADE,
    ) 
    rx_process = models.OneToOneField(
        RxProcess,
        on_delete=models.CASCADE,
    ) 
    review_new_pt = models.ForeignKey(
        RxReview,
        related_name='review_new_pt',
        on_delete=models.CASCADE,
    ) 
    review_new_rx = models.ForeignKey(
        RxReview,
        related_name='review_new_rx',
        on_delete=models.CASCADE,
    ) 
    review_rpt_rx = models.ForeignKey(
        RxReview,
        related_name='review_rpt_pt',
        on_delete=models.CASCADE,
    ) 
    comm_illegible = models.ForeignKey(
        RxComm,
        related_name='comm_illegible',
        on_delete=models.CASCADE,
    ) 
    comm_incomplete = models.ForeignKey(
        RxComm,
        related_name='comm_incomplete',
        on_delete=models.CASCADE,
    ) 
    comm_dose = models.ForeignKey(
        RxComm,
        related_name='comm_dose',
        on_delete=models.CASCADE,
    ) 
    comm_advise = models.ForeignKey(
        RxComm,
        related_name='comm_advise',
        on_delete=models.CASCADE,
    ) 
    comm_renewal = models.ForeignKey(
        RxComm,
        related_name='comm_renewal',
        on_delete=models.CASCADE,
    ) 
    comm_cancel = models.ForeignKey(
        RxComm,
        related_name='comm_cancel',
        on_delete=models.CASCADE,
    ) 
    comm_consult = models.ForeignKey(
        RxComm,
        related_name='comm_consult',
        on_delete=models.CASCADE,
    ) 
    

    username = models.CharField(max_length=100, blank=True, default='')
    stats_notes = models.CharField(max_length=300, blank=True, default='')
    review_notes = models.CharField(max_length=300, blank=True, default='')
    def __str__(self):
        return self.username


# Serializers

class RxProcessSerializer(serializers.ModelSerializer):

    class Meta:
        model = RxProcess
        fields = ('pk',
            'num_new_pt',
            'num_new_rx',
            'num_rpt_rx',
            'pharm_ip',
            'reg_ip',
            'unreg_ip'
        )
class RxReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = RxReview
        fields = ('pk',
            'before_rx',
            'after_rx'
        )
class RxCommSerializer(serializers.ModelSerializer):

    class Meta:
        model = RxComm
        fields = ('pk',
            'daily_duration',
            'daily_freq',
            'daily_elapsed',
            'by_fax',
            'by_phone',
            'by_dm'
        )
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
class RxDescriptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = RxDescription
        fields = ('pk',
            'participant_name',
            'street',
            'city',
            'province',
            'corporate_type', 
            'pharmacy_mgt_system'
        )

class DispenserSerializer(WritableNestedModelSerializer):

    description = RxDescriptionSerializer()
    numbers = NumbersSerializer()
    total_rx = RxStatsSerializer()
    walkin_rx = RxStatsSerializer()
    faxed_rx = RxStatsSerializer()
    e_prescribe_rx = RxStatsSerializer()
    phoned_rx = RxStatsSerializer()
    rx_process = RxProcessSerializer()
    review_new_pt = RxReviewSerializer()
    review_new_rx = RxReviewSerializer()
    review_rpt_rx = RxReviewSerializer()
    comm_illegible = RxCommSerializer()
    comm_incomplete = RxCommSerializer()
    comm_dose = RxCommSerializer()
    comm_advise = RxCommSerializer()
    comm_renewal = RxCommSerializer()
    comm_cancel = RxCommSerializer()
    comm_consult = RxCommSerializer()


    class Meta:
        model = Dispenser
        fields = ('pk',
            'username',
            'description',
            'numbers',
            'total_rx',
            'walkin_rx',
            'faxed_rx',
            'e_prescribe_rx',
            'phoned_rx',
            'stats_notes',
            'rx_process',
            'review_new_pt',
            'review_new_rx',
            'review_rpt_rx',
            'review_notes',
            'comm_illegible',
            'comm_incomplete',
            'comm_dose',
            'comm_advise',
            'comm_renewal',
            'comm_cancel',
            'comm_consult'
        )

            
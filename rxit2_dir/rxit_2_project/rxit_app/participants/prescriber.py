from django.db import models
from rest_framework import serializers
from drf_writable_nested import WritableNestedModelSerializer

# Description
class DxDescription(models.Model):
    participant_name = models.CharField(max_length=100, blank=True, default='')
    street = models.CharField(max_length=100, blank=True, default='') 
    city = models.CharField(max_length=100, blank=True, default='')
    province = models.CharField(max_length=100, blank=True, default='')
    practice_type = models.CharField(max_length=100, blank=True, default='')
    medical_record_system = models.CharField(max_length=100, blank=True, default='')
    num_physicians = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    
    FHT_FHN_FHO = 'FH'
    GROUP = 'GP'
    SOLO = 'SL'
    PRACTICE_CHOICES = (
        (FHT_FHN_FHO, 'FHT/FHN/FHO'),
        (GROUP, 'Group'),
        (SOLO, 'Solo')
    )
    practice_type = models.CharField(
        max_length=2,
        choices=PRACTICE_CHOICES,
        default=SOLO,
    )

# DxStats
class DxStats(models.Model):
    num_daily = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    num_weekly = models.DecimalField(max_digits=4, decimal_places=1, default=0)

class DxDelivery(models.Model):
    method_del = models.BooleanField(default=False)
    fraction_del = models.DecimalField(max_digits=4, decimal_places=1, default=0)

class DxAdmin(models.Model):
    daily_freq = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    daily_rx_messages = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    pc_urgent_messages = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    total_time_messages = models.DecimalField(max_digits=4, decimal_places=1, default=0)

    ADMIN = 'AD'
    ASST = 'AS'
    NURSE = 'RN'
    PHYSICIAN = 'MD'
    OTHER = 'OT'
    ACTIVITY_CHOICES = (
        (ADMIN, 'Office admin'),
        (ASST, 'Assistant'),
        (NURSE, 'Nurse'),
        (PHYSICIAN, 'Physician'),
        (OTHER, 'Other')
    )
    comm_role = models.CharField(
        max_length=2,
        choices=ACTIVITY_CHOICES,
        default=ADMIN,
    )

class DxPrep(models.Model):
    dx_freq = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    dx_duration = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    within_emr = models.BooleanField(default=False)
    linked_to_emr = models.BooleanField(default=False)
    desktop = models.BooleanField(default=False)
    mobile_app = models.BooleanField(default=False)

class DxSpec(models.Model):
     spec_duration = models.DecimalField(max_digits=4, decimal_places=1, default=0)
     by_hand = models.BooleanField(default=False)
     free_text = models.BooleanField(default=False)
     drop_down = models.BooleanField(default=False)
     check_box = models.BooleanField(default=False)
     search = models.BooleanField(default=False)
  

class Prescriber(models.Model):
    description = models.OneToOneField(
        DxDescription,
        on_delete=models.CASCADE,
    ) 
    total_pts = models.ForeignKey(DxStats, related_name='total_pts', on_delete=models.CASCADE,) 
    std_pts = models.ForeignKey(DxStats, related_name='std_pts', on_delete=models.CASCADE,) 
    extend_pts = models.ForeignKey(DxStats, related_name='extend_pts', on_delete=models.CASCADE,) 
    ongoing_pts = models.ForeignKey(DxStats, related_name='ongoing_pts', on_delete=models.CASCADE,) 
    total_rx = models.ForeignKey(DxStats, related_name='total_rx', on_delete=models.CASCADE,) 
    new_rx = models.ForeignKey(DxStats, related_name='new_rx', on_delete=models.CASCADE,) 
    renew_rx = models.ForeignKey(DxStats, related_name='renew_rx', on_delete=models.CASCADE,) 
    auto_renew_rx = models.ForeignKey(DxStats, related_name='auto_renew_rx', on_delete=models.CASCADE,) 
    poly_rx = models.ForeignKey(DxStats, related_name='poly_rx', on_delete=models.CASCADE,) 
    clarify_msg = models.ForeignKey(DxStats, related_name='clarify_msg', on_delete=models.CASCADE,) 
    authorize_msg = models.ForeignKey(DxStats, related_name='authorize_msg', on_delete=models.CASCADE,) 
    stats_notes = models.CharField(max_length=100, blank=True, default='')

    printed_rx = models.ForeignKey(DxDelivery, related_name='printed_rx', on_delete=models.CASCADE,) 
    faxed_rx = models.ForeignKey(DxDelivery, related_name='faxed_rx', on_delete=models.CASCADE,) 
    phoned_rx = models.ForeignKey(DxDelivery, related_name='phoned_rx', on_delete=models.CASCADE,) 
    e_prescribe_rx = models.ForeignKey(DxDelivery, related_name='e_prescribe_rx', on_delete=models.CASCADE,) 

    receive_msg = models.ForeignKey(DxAdmin, related_name='receive_msg', on_delete=models.CASCADE,) 
    process_msg = models.ForeignKey(DxAdmin, related_name='process_msg', on_delete=models.CASCADE,) 

    pat_hx = models.ForeignKey(DxPrep, related_name='pat_hx', on_delete=models.CASCADE,) 
    cds = models.ForeignKey(DxPrep, related_name='cds', on_delete=models.CASCADE,) 
    p_formulary = models.ForeignKey(DxPrep, related_name='p_formulary', on_delete=models.CASCADE,) 
    p_dis = models.ForeignKey(DxPrep, related_name='p_dis', on_delete=models.CASCADE,) 

    drug_name = models.ForeignKey(DxSpec, related_name='drug_name', on_delete=models.CASCADE,) 
    dosage = models.ForeignKey(DxSpec, related_name='dosage', on_delete=models.CASCADE,) 
    refills = models.ForeignKey(DxSpec, related_name='refills', on_delete=models.CASCADE,) 
    route = models.ForeignKey(DxSpec, related_name='route', on_delete=models.CASCADE,) 
    instructions = models.ForeignKey(DxSpec, related_name='instructions', on_delete=models.CASCADE,) 
 
    username = models.CharField(max_length=100, blank=True, default='')
    deliver_notes = models.CharField(max_length=100, blank=True, default='')

    def __str__(self):
        return self.username

class DxStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DxStats
        fields = ('pk',
            'num_daily',
            'num_weekly'
        )

class DxDeliverySerializer(serializers.ModelSerializer):
    class Meta:
        model = DxDelivery
        fields = ('pk',
            'method_del',
            'fraction_del'
        )

class DxAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = DxAdmin
        fields = ('pk',
            'daily_freq',
            'daily_rx_messages',
            'pc_urgent_messages',
            'total_time_messages',
            'comm_role'
        )

class DxPrepSerializer(serializers.ModelSerializer):
    class Meta:
        model = DxPrep
        fields = ('pk',
            'dx_freq',
            'dx_duration',
            'within_emr',
            'linked_to_emr',
            'desktop',
            'mobile_app'
        )

class DxSpecSerializer(serializers.ModelSerializer):
    class Meta:
        model = DxSpec
        fields = ('pk',
            'spec_duration',
            'by_hand',
            'free_text',
            'drop_down',
            'check_box',
            'search'
        )

class DxDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DxDescription
        fields = ('pk',
            'participant_name', 
            'street',
            'city',
            'province',
            'practice_type',
            'medical_record_system',
            'num_physicians',
            'practice_type'
        )

class PrescriberSerializer(WritableNestedModelSerializer):
 
    description = DxDescriptionSerializer()
    total_pts = DxStatsSerializer()
    std_pts = DxStatsSerializer()
    extend_pts = DxStatsSerializer()
    ongoing_pts = DxStatsSerializer()
    total_rx = DxStatsSerializer()
    new_rx = DxStatsSerializer()
    renew_rx = DxStatsSerializer()
    auto_renew_rx = DxStatsSerializer()
    poly_rx = DxStatsSerializer()
    clarify_msg = DxStatsSerializer()
    authorize_msg = DxStatsSerializer()

    printed_rx =  DxDeliverySerializer()  
    faxed_rx =  DxDeliverySerializer()  
    phoned_rx =  DxDeliverySerializer()  
    e_prescribe_rx =  DxDeliverySerializer()  

    receive_msg = DxAdminSerializer()
    process_msg = DxAdminSerializer()

    pat_hx = DxPrepSerializer()
    cds = DxPrepSerializer()
    p_formulary = DxPrepSerializer()
    p_dis = DxPrepSerializer()

    drug_name = DxSpecSerializer()
    dosage = DxSpecSerializer()
    refills = DxSpecSerializer()
    route = DxSpecSerializer()
    instructions = DxSpecSerializer()

    class Meta:
        model = Prescriber
        fields = ('pk', 
            'username',
            'description',
            'total_pts',
            'std_pts',
            'extend_pts',
            'ongoing_pts',
            'total_rx',
            'new_rx',
            'renew_rx',
            'auto_renew_rx',
            'poly_rx',
            'clarify_msg',
            'authorize_msg',
            'stats_notes',
            'printed_rx',
            'faxed_rx',
            'phoned_rx',
            'e_prescribe_rx',
            'deliver_notes',
            'receive_msg',
            'process_msg',
            'pat_hx',
            'cds',
            'p_formulary',
            'p_dis',
            'drug_name',
            'dosage',
            'refills',
            'route',
            'instructions'
            )

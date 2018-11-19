# Generated by Django 2.1.3 on 2018-11-18 11:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rxitapp', '0008_auto_20181118_0919'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dispstatistics',
            name='dispenser',
        ),
        migrations.AddField(
            model_name='dispenser',
            name='statistics',
            field=models.OneToOneField(blank=True, default='', on_delete=django.db.models.deletion.CASCADE, to='rxitapp.DispStatistics'),
        ),
    ]
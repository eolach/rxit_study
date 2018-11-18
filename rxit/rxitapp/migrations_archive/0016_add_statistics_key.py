# Generated by Django 2.1.3 on 2018-11-18 14:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rxitapp', '0015_remove_statistics'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dispenser',
            name='id',
        ),
        migrations.AddField(
            model_name='dispenser',
            name='statistics',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='rxitapp.DispStatistics'),
            preserve_default=False,
        ),
    ]

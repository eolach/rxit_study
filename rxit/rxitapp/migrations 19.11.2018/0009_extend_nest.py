# Generated by Django 2.1.3 on 2018-11-19 12:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rxitapp', '0008_start_over'),
    ]

    operations = [
        migrations.AddField(
            model_name='nest_model',
            name='nest_description',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
    ]